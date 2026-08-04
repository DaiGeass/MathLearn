use axum::{routing::{get, post}, Json, Router};
use clap::Parser;
use serde::{Deserialize, Serialize};
use std::{fs::{self, File}, io::{Read, Write}, net::SocketAddr, path::PathBuf};
use tower_http::{cors::CorsLayer, services::ServeDir};

#[derive(Parser, Debug)]
#[command(author, version, about)]
struct Args {
    #[arg(short, long, default_value_t = 8080)]
    port: u16,
    #[arg(short, long)]
    open: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Progress { points: i32, streak: i32, level: i32, exercises_completed: i32, correct_answers: i32, achievements: Vec<String>, lives: i32 }
#[derive(Serialize, Deserialize, Clone, Debug)]
struct Task { id: String, text: String, done: bool, priority: String, category: String }
#[derive(Serialize, Deserialize, Clone, Debug)]
struct Template { id: String, name: String, theme: String, primary_color: String, secondary_color: String, accent_color: String, font_size: f32, border_radius: f32, font_family: String, is_dark_mode: bool, bg_pattern: String, sidebar_pos: String, btn_shape: String, density: String, transition_speed: f32, shadow_level: String, zoom: f32, line_height: f32 }

fn storage_dir() -> PathBuf {
    let mut p = std::env::var_os("HOME").or_else(|| std::env::var_os("USERPROFILE")).map(PathBuf::from).unwrap_or_else(|| PathBuf::from("."));
    p.push(".mathlearn");
    let _ = fs::create_dir_all(&p);
    p
}
fn file_path(name: &str) -> PathBuf { let mut p = storage_dir(); p.push(name); p }

async fn load_json<T: serde::de::DeserializeOwned>(name: &str, default: T) -> Json<T> {
    if let Ok(mut f) = File::open(file_path(name)) {
        let mut s = String::new();
        if f.read_to_string(&mut s).is_ok() { if let Ok(v) = serde_json::from_str(&s) { return Json(v); } }
    }
    Json(default)
}
async fn save_json<T: serde::Serialize>(name: &str, data: Json<T>) -> Json<bool> {
    if let Ok(mut f) = File::create(file_path(name)) {
        if let Ok(s) = serde_json::to_string(&data.0) { if f.write_all(s.as_bytes()).is_ok() { return Json(true); } }
    }
    Json(false)
}

async fn get_progress() -> Json<Progress> { load_json("progress.json", Progress { points: 0, streak: 0, level: 1, exercises_completed: 0, correct_answers: 0, achievements: vec![], lives: 3 }).await }
async fn post_progress(p: Json<Progress>) -> Json<bool> { save_json("progress.json", p).await }
async fn get_tasks() -> Json<Vec<Task>> { load_json("tasks.json", vec![]).await }
async fn post_tasks(t: Json<Vec<Task>>) -> Json<bool> { save_json("tasks.json", t).await }
async fn get_templates() -> Json<Vec<Template>> { load_json("templates.json", vec![]).await }
async fn post_templates(t: Json<Vec<Template>>) -> Json<bool> { save_json("templates.json", t).await }

#[tokio::main]
async fn main() {
    let args = Args::parse();
    let addr = SocketAddr::from(([127, 0, 0, 1], args.port));
    println!("🚀 MathLearn Pro en http://{}", addr);
    let app = Router::new()
        .route("/api/progress", get(get_progress).post(post_progress))
        .route("/api/tasks", get(get_tasks).post(post_tasks))
        .route("/api/templates", get(get_templates).post(post_templates))
        .fallback_service(ServeDir::new("dist"))
        .layer(CorsLayer::permissive());
    if args.open { let _ = open::that(format!("http://{}", addr)); }
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

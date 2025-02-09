use tauri_plugin_updater::UpdaterExt;
use std::time::Duration;
use std::process::Command;
use std::thread;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
    .setup(|app| {
        let handle = app.handle().clone();
        tauri::async_runtime::spawn(async move {
          update(handle).await.unwrap();
        });
        Ok(())
      })
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
  if let Some(update) = app.updater()?.check().await? {
    println!("Update found! Preparing to update...");

    // Step 1: Kill backend.exe if it's running
    println!("Stopping backend.exe before updating...");
    let _ = Command::new("taskkill")
        .args(&["/F", "/IM", "backend.exe"])
        .output(); // Force kill backend.exe if running

    // Step 2: Wait a bit to ensure backend.exe is fully stopped
    thread::sleep(Duration::from_secs(2));

    let mut downloaded = 0;

    update
      .download_and_install(
        |chunk_length, content_length| {
          downloaded += chunk_length;
          println!("downloaded {downloaded} from {content_length:?}");
        },
        || {
          println!("download finished");
        },
      )
      .await?;

    println!("update installed");
    app.restart();
  }

  Ok(())
}
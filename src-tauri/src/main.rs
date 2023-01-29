#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use md2scrap::scrapbox as sb;
use pulldown_cmark::Parser;

#[tauri::command]
fn compile_md2scrap(md: &str) -> String {
  let option = sb::option::ScrapboxOption::default();
  let parser = Parser::new(md);
  let mut output = String::new();

  sb::push_scrapbox(&mut output, parser, option);
  output
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![compile_md2scrap])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

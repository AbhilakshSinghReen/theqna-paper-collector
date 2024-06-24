function downloadObjectAsJSONFile(objectData, filename) {
  const jsonString = JSON.stringify(objectData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = URL.createObjectURL(blob);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export { downloadObjectAsJSONFile };

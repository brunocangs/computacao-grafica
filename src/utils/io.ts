const downloadElement = document.createElement("a");
const uploadElement = document.createElement("input");
uploadElement.type = "file";
document.body.appendChild(uploadElement);
uploadElement.style.display = "none";
document.body.appendChild(downloadElement);
downloadElement.style.display = "none";

export const upload = (): Promise<string> => {
  uploadElement.click();
  return new Promise((resolve, reject) => {
    uploadElement.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function(event: any) {
        resolve(event.target.result);
      };
      reader.readAsText(file);
    };
  });
};

export const download = (data: any, filename: string) => {
  downloadElement.download = filename;
  const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
  const url = window.URL.createObjectURL(file);
  downloadElement.href = url;
  downloadElement.click();
  window.URL.revokeObjectURL(url);
};

export class Title {
  title: HTMLParagraphElement;
  constructor(title: string = "") {
    this.title = document.createElement("p");
    this.title.style.position = "fixed";
    this.title.style.top = "6px";
    this.title.style.left = "50%";
    this.title.style.transform = "translateX(-50%)";
    this.title.style.fontFamily = "sans-serif";
    this.title.style.fontSize = "2em";
    this.title.style.color = "white";
    this.title.innerText = title;
    this.title.style.pointerEvents = "none";
    document.body.appendChild(this.title);
  }
  set(title: string) {
    this.title.innerText = title;
  }
  toggleVisibility() {
    this.title.style.visibility =
      this.title.style.visibility === "hidden" ? "visible" : "hidden";
  }
}

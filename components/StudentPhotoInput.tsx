"use client";

import { ChangeEvent, useState } from "react";

type StudentPhotoInputProps = {
  initialPhoto?: string | null;
};

const MAX_PHOTO_LENGTH = 360_000;

function resizePhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Nao foi possivel ler a foto."));
    reader.onload = () => {
      const image = new Image();

      image.onerror = () => reject(new Error("Escolha uma imagem valida."));
      image.onload = () => {
        const maxSize = 520;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Nao foi possivel preparar a foto."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const result = canvas.toDataURL("image/jpeg", 0.72);

        if (result.length > MAX_PHOTO_LENGTH) {
          reject(new Error("A foto ficou muito pesada. Escolha uma imagem menor."));
          return;
        }

        resolve(result);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export function StudentPhotoInput({ initialPhoto }: StudentPhotoInputProps) {
  const [photoData, setPhotoData] = useState("");
  const [preview, setPreview] = useState(initialPhoto ?? "");
  const [removePhoto, setRemovePhoto] = useState(false);
  const [message, setMessage] = useState("");

  async function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Escolha um arquivo de imagem.");
      return;
    }

    try {
      setMessage("Preparando foto...");
      const resized = await resizePhoto(file);
      setPhotoData(resized);
      setPreview(resized);
      setRemovePhoto(false);
      setMessage("Foto pronta para salvar.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel preparar a foto.");
    }
  }

  function clearPhoto() {
    setPhotoData("");
    setPreview("");
    setRemovePhoto(true);
    setMessage("A foto sera removida ao salvar.");
  }

  return (
    <div className="student-photo-field form-span">
      <div className="student-photo-preview">
        {preview ? <img src={preview} alt="Previa da foto do aluno" /> : <span>Sem foto</span>}
      </div>
      <div>
        <label className="student-photo-label">
          Foto do aluno
          <input type="file" accept="image/*" onChange={selectPhoto} />
        </label>
        <input name="photoData" type="hidden" value={photoData} />
        <input name="removePhoto" type="hidden" value={removePhoto ? "yes" : "no"} />
        {preview ? <button className="text-button danger-text" type="button" onClick={clearPhoto}>Remover foto</button> : null}
        {message ? <p className="form-help">{message}</p> : <p className="form-help">Escolha uma imagem do computador. Ela sera reduzida automaticamente.</p>}
      </div>
    </div>
  );
}

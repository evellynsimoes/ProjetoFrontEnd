import { useEffect, useState } from "react";
import { Camera } from "../Componentes/Camera";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Button from "@mui/material/Button";

export function Galeria() {
  const [fotos, setFotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Abre o modal automaticamente quando o componente é carregado
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleFotoTirada = (imageBase64) => {
    const novaFoto = {
      img: imageBase64,
      title: `Foto ${fotos.length + 1}`,
      author: "Você",
    };
    setFotos([novaFoto, ...fotos]);
  };

  const limparGaleria = () => setFotos([]);

  return (
    <section className="corpo">
      {/* MODAL */}
      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div
            className="camera-box"
            onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
          >
            <Camera onFotoTirada={handleFotoTirada} />

            <div className="galeria">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Galeria</h3>
                {fotos.length > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={limparGaleria}
                  >
                    Limpar Galeria
                  </Button>
                )}
              </div>

              {fotos.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: 20 }}>
                  Nenhuma foto capturada ainda.
                </p>
              ) : (
                <ImageList sx={{ width: "100%", height: "auto" }}>
                  {fotos.map((item, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={<span>{item.author}</span>}
                        position="below"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </div>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsOpen(false)}
              style={{ marginTop: "1rem" }}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

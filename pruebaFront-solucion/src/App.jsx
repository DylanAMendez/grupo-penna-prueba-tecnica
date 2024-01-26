import { useState, useEffect } from 'react'
import './App.css'

function App()
{
  // cargar datos del usuario
  const [user, setUser] = useState([]);

  // cargar archivo pdf y titulo
  const [archivoPdf, setArchivoPdf] = useState(null);
  const [tituloPdf, setTituloPdf] = useState('');
  const [listaPdf, setListaPdf] = useState([]);

  // cargar imagen y titulo
  const [tituloImagen, setTituloImagen] = useState('');
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [listaImagen, setListaImagen] = useState([]);

  // funciones

  // obtener datos de los usuarios
  const usersURL = 'http://localhost:3001/api/prueba/users';

  const addNewUser = async (nombre, apellido, numero, fecha) =>
  {
    try {
      const newUser = { nombre, apellido, numero, fecha }

      const options =
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      };

      const response = await fetch(usersURL, options);
      const data = await response.json();

      console.log('Usuario Creado: ', data);

      setUser([...user, newUser]);

      resetForm()

    } catch (error) {
      console.error('Error al crear usuario', error);
    }


  }

  const pdfURL = 'http://localhost:3001/api/prueba/pdf';

  const addNewPdf = async () =>
  {
    try {
      const formData = new FormData();
      formData.append('file', archivoPdf);
      formData.append('titulo', tituloPdf);

      const options = {
        method: 'POST',
        body: formData,
      };

      const response = await fetch(pdfURL, options,);
      const data = await response.json();

      console.log("PDF creado ", data);

      const idPdf = data.file.id

      console.log('idPdf : ', idPdf);

      setListaPdf([...listaPdf, { idPdf: data.file.id, url: data.file.path }])

      resetPdfForm();

    } catch (error) {
      console.error('Error al subir archivo PDF', error.message);
    }
  }



  const handleTituloChange = (e) =>
  {
    setTituloPdf(e.target.value);
  }

  const handleArchivoPdfChange = (e) => 
  {
    const newArchivoPdf = e.target.files[0];
    setArchivoPdf(newArchivoPdf);
  }

  const resetPdfForm = () => 
  {
    setTituloPdf('');
    setArchivoPdf(null);
  }

  const imagenURL = 'http://localhost:3001/api/prueba/image';

  const addNewImagen = async (titulo) => 
  {
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('image', archivoImagen);

      const options =
      {
        method: 'POST',
        body: formData,
      }

      const response = await fetch(imagenURL, options);
      const data = await response.json();

      console.log('Imagen Creada', data);

      const idImagen = data.image.id;
      const imagePath = data.image.imagePath;

      console.log('ID de la imagen: ', idImagen);
      console.log('Path imagen: ', imagePath);

      setListaImagen([...listaImagen, { idImagen: data.image.id, tituloImagen, url: data.image.imagePath }]);


    } catch (error) {
      console.log("Error al agregar la Imagen", error);
    }

  }

  const handleTituloImagenChange = (e) => 
  {
    const newImagen = e.target.value;
    setTituloImagen(newImagen);
  }

  const handleArchivoImagenChange = (e) => 
  {
    const newImagen = e.target.files[0];
    setArchivoImagen(newImagen);
  }

  // reset datos de los inputs del usuario
  const resetForm = () => 
  {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("fecha").value = "";
  }



  return (
    <>
      <header>
        {/* Formulario para cargar usuario */}
        <form onSubmit={(e) => 
        {
          e.preventDefault();
          const nombre = document.getElementById("nombre").value;
          const apellido = document.getElementById("apellido").value;
          const numero = document.getElementById("numero").value;
          const fecha = document.getElementById("fecha").value;
          addNewUser(nombre, apellido, numero, fecha);
        }}>
          <label> Nombre </label>
          <input type="text" name='nombre' id='nombre' required />

          <label> Apellido </label>
          <input type="text" name='apellido' id='apellido' required />

          <label> Teléfono </label>
          <input type="tel" name='numero' id='numero' required />

          <label> Fecha de Nacimiento </label>
          <input type="date" name='fecha' id='fecha' required />

          <button type='submit'>enviar</button>
        </form>

        {/* Formulario para cargar pdf */}

        <form onSubmit={(e) => 
        {
          e.preventDefault()
          const titulo = document.getElementById("tituloPdf").value;
          addNewPdf(titulo);
        }}>
          <label>Titulo PDF</label>
          <input type="text" value={tituloPdf} onChange={handleTituloChange} id='tituloPdf' required />

          <label>PDF</label>
          <input type="file" onChange={handleArchivoPdfChange} accept='.pdf' required />

          <button type='submit'>Cargar PDF</button>
        </form>

        {/* Formulario para cargar Imagen */}

        <form onSubmit={(e) => 
        {
          e.preventDefault();
          const titulo = document.getElementById("tituloImagen").value;
          addNewImagen(titulo);
        }}>

          <label>Titulo</label>
          <input type="text" value={tituloImagen} onChange={handleTituloImagenChange} id='tituloImagen' required />

          <label>Imagen</label>
          <input type="file" onChange={handleArchivoImagenChange} id='archivoImagen' accept='image/*' />

          <button type='submit'>Cargar Imagen</button>
        </form>

      </header>

      <main>
        {/* mostrar usuario ingresado */}
        <div>
          <ul>
            {user.map(u => (
              <li key={u.nombre}> {u.nombre} - {u.apellido} - {u.numero} - {u.fecha} </li>
            ))}
          </ul>
        </div>

        {/* mostrar pdf ingresado */}
        <div>
          <ul>
            {listaPdf.map(pdf => (
              <li key={pdf.idPdf}>
                {pdf.tituloPdf}
                {pdf.url &&
                  (
                    <iframe
                      src={`http://localhost:3001/api/prueba/pdf/${pdf.idPdf}`}
                      title={`${pdf.tituloPdf} `}
                      style={{ width: '300px', height: '300px' }}
                    />
                  )}
                <a
                  href={`http://localhost:3001/api/prueba/pdf/${pdf.idPdf}`}
                  download={`${pdf.tituloPdf}.pdf`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Descargar PDF
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* mostrar imagen ingresada */}
        <div>
          <ul>
            {listaImagen.map(l => (
              <li key={l.tituloImagen}>
                {l.tituloImagen}
                {l.tituloImagen && (
                  <img
                    src={`http://localhost:3001/api/prueba/image/${l.idImagen}`}
                    alt={`${l.tituloImagen} `}
                    style={{ maxWidth: '100px', maxHeight: '100px' }} />
                )}
                <a
                  href={`http://localhost:3001/api/prueba/image/${l.idImagen}`}
                  download={`http://localhost:3001/api/prueba/image/${l.idImagen}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Descargar Imagen
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'

import './App.css'

function App()
{
  //* NEW USER
  const [users, setUsers] = useState([]);

  //? almacenar entrada enviada por el usuario y configurar como el atributo value del input
  const [newNombre, setNewNombre] = useState('');
  const [newApellido, setNewApellido] = useState('');
  const [newNumero, setNewNumero] = useState('');
  const [newFecha, setNewFecha] = useState('');

  const usersURL = 'http://localhost:3001/api/prueba/users'

  const obtenerDatosUsers = () => 
  {
    fetch(usersURL)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  //? función agregar nuevo usuario
  const addUser = async (event) => 
  {
    try {
      event.preventDefault();

      const userObject = {
        nombre: newNombre,
        apellido: newApellido,
        numero: newNumero,
        fecha: newFecha,
      }

      const options =
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject)
      }

      const response = await fetch(usersURL, options);
      const data = await response.json();

      console.log('user creado: ', data);

      setUsers([...users, userObject]);

    } catch (error) {
      console.error('Error al enviar user ', error);
    }

  }

  const handleNombreChange = (event) => 
  {
    setNewNombre(event.target.value);
  }

  const handleApellidoChange = (event) => 
  {
    setNewApellido(event.target.value);
  }

  const handleNumeroChange = (event) => 
  {
    setNewNumero(event.target.value);
  }

  const handleFechaChange = (event) => 
  {
    setNewFecha(event.target.value);
  }


  //* NEW PDF
  const [newPdf, setNewPdf] = useState([]);

  const [pdfTitulo, setPdfTitulo] = useState('');
  const [pdfPath, setPdfPath] = useState(null);

  const pdfURL = 'http://localhost:3001/api/prueba/pdf'

  const obtenerDatosPdf = () => 
  {
    fetch(pdfURL)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const addPdf = async (event) => 
  {
    try {
      const formData = new FormData();
      formData.append('titulo', pdfTitulo);
      formData.append('file', pdfPath);

      event.preventDefault();

      //! habilité la constante 'options' para poder enviar los datos
      // const pdfObject = {
      //   titulo: pdfTitulo,
      //   path: pdfPath,
      // }

      const options =
      {
        method: 'POST',
        body: formData,
      }

      const response = await fetch(pdfURL, options);
      const data = await response.json();

      console.log(data);

      setNewPdf([...newPdf, { titulo: pdfTitulo, path: pdfPath }]);

      setPdfTitulo('');
      setPdfPath(null);

    } catch (error) {
      console.error('Error al subir pdf: ', error)
    }

  }

  const handlePdfTituloChange = (event) => 
  {
    const newTituloPdf = event.target.value;
    setPdfTitulo(newTituloPdf);
  }

  const handlePdfPathChange = (event) => 
  {
    const newPdfPath = event.target.files[0];
    setPdfPath(newPdfPath);
  }

  // console.log(newPdf);
  // console.log('PATH PDF: ', newPdf.map(p => p.path));


  //* NEW IMAGE
  const [newImage, setNewImage] = useState([]);
  const [imageTitulo, setImageTitulo] = useState('');
  const [imagePath, setImagePath] = useState(null);

  const imageURL = 'http://localhost:3001/api/prueba/image';

  const obtenerDatosImage = () => 
  {
    fetch(imageURL)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const addImage = async (event) => 
  {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append('titulo', imageTitulo);
      formData.append('image', imagePath);

      const options =
      {
        method: 'POST',
        body: formData,
      }

      const response = await fetch(imageURL, options)
      const data = await response.json();

      console.log('Imagen cargada ', data);

      setNewImage([...newImage, { titulo: imageTitulo, imagePath: imagePath }]);

    } catch (error) {
      console.error('Error al subir imagen ', error);
    }

  }

  const handleImageTituloChange = (event) => 
  {
    setImageTitulo(event.target.value);
  }

  const handleImagePathChange = (event) => 
  {
    const pathImage = event.target.files[0];
    setImagePath(pathImage);
  }

  // console.log(newImage);

  //* useEffect
  useEffect(() =>
  {

    // obtenerDatosUsers()
    //obtenerDatosPdf()
    obtenerDatosImage()

  }, [])

  return (
    <>
      <header>
        <form onSubmit={addUser}>

          <label>nombre:</label>
          <input type="text" name='nombre' value={newNombre} onChange={handleNombreChange} />

          <label>apellido:</label>
          <input type="text" name='apellido' value={newApellido} onChange={handleApellidoChange} />

          <label>numero:</label>
          <input type="tel" name='numero' value={newNumero} onChange={handleNumeroChange} />

          <label>fecha:</label>
          <input type="date" name='fecha' value={newFecha} onChange={handleFechaChange} />

          <button type='submit'>enviar</button>

        </form>
      </header>

      <header>
        <form onSubmit={addPdf}>

          <label>titulo pdf</label>
          <input type="text" value={pdfTitulo} name='titulo' onChange={handlePdfTituloChange} />

          <label>PDF</label>
          <input type="file" name='path' onChange={handlePdfPathChange} accept='.pdf' />

          <button type='submit'>enviar</button>

        </form>
      </header>

      <header>
        <form onSubmit={addImage}>

          <label>titulo:</label>
          <input type="text" value={imageTitulo} onChange={handleImageTituloChange} name='titulo' />

          <label>imagen:</label>
          <input type="file" name='imagePath' onChange={handleImagePathChange} accept='image/*' />

          <button type='submit'>enviar</button>

        </form>
      </header>

      {/* mostrar new user */}
      <main>

        <div>
          <ul>
            {users.map(user => (
              <li key={user.nombre}> {user.nombre} - {user.apellido} - {user.numero} - {user.fecha} </li>
            ))}
          </ul>
        </div>

        {/* mostrar new pdf */}

        <div>
          <ul>
            {newPdf.map(pdf => (
              <li key={pdf.path}>

                {pdf.titulo}

                {pdf.path &&

                  <iframe
                    src={URL.createObjectURL(pdf.path)}
                    style={{ width: '300px', height: '300px' }}
                  />

                }

              </li>

            ))}
          </ul>
        </div>

        {/* mostrar new image */}

        <div>
          <ul>
            {newImage.map(image => (
              <li key={image.titulo}>
                {image.titulo}

                {image.imagePath &&
                  <img
                    src={URL.createObjectURL(image.imagePath)}
                    alt={`imagen ${image.titulo} `}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                }
              </li>
            ))}
          </ul>
        </div>

      </main>
    </>
  )
}

export default App

import logo from '../assets/logo.png'
import FormRegistro from '../components/FormRegistro';

function Registro() {
  return (
    <>
      <main className="h-[100vh] w-full bg-gris-neutro flex items-center justify-center">
        <section className="flex flex-col gap-6 items-center justify-center h-auto py-8 md:py-10 xl:py-12 w-4/5 xl:w-3/5 lg:w-4/5 bg-blanco border border-azul-brillante rounded-md shadow-xl shadow-[rgba(0, 0, 0, 0.7)]">
          <img
            src={logo}
            alt="Logo Computer Planet"
            className="w-4/5 md:w-3/5 lg:w-3/6 h-auto"
          />
          <FormRegistro />
        </section>
      </main>
    </>
  );
}

export default Registro;

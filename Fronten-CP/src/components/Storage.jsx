import { useState } from 'react';
import { Pagination } from './Pagination';
import Card from './Card';
import CardUser from './CardUser';

function Storage({data, type}) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(data.length / porPagina);

  return (
    <>
      <section className="flex flex-col w-full">
        <div>
          <div className="bg-blanco py-2 px-3 inline-block border border-b-0 border-azul-brillante rounded-t-lg">
            <h2 className="text-negro text-base md:text-lg font-medium inline-block">
              Productos Disponibles
            </h2>
          </div>
        </div>
        <div></div>

        <div className="px-5 py-10 bg-blanco border border-azul-brillante rounded-tr-lg rounded-b-lg flex flex-col gap-10">
          <ul className="flex flex-wrap justify-center gap-4">
            {data
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((item) =>
                type === "product" ? (
                  <Card item={item} />
                ) : (
                  <CardUser item={item} />
                )
              )}
          </ul>
          <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </section>
    </>
  );
}

export default Storage;

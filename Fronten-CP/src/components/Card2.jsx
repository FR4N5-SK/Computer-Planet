function Card2({ item }) {

    return (
      <>
        <div class="w-full h-auto bg-gris-neutro border border-gray-400 rounded-lg shadow-sm flex items-center">
            <img class="w-2/6 rounded-t-lg rounded-bl-lg" src={`http://localhost:3080/api/uploads/${item.image}`} alt="product image" />
          <div class="px-5 py-5 w-4/6">
            <a>
              <h5 class="text-xs lg:text-sm font-bold tracking-tight text-gray-900">
                {item.name}
              </h5>
            </a>
            <div class="flex items-center justify-between mt-4">
              <span class="text-base font-bold text-gray-900 dark:text-white">
                {item.price}{item.currency}
              </span>
            </div>
  
    
          </div>
        </div>
      </>
    );
  }
  
  export default Card2;
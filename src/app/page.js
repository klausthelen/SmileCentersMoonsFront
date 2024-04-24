'use client';
import getFilters from "./libs/getFilters";
import getResults from "./libs/getSearchResults";
import { useState, useEffect } from 'react';


export default function Home() {
  const [filters, setFilters] = useState({
    zones : [],
    services: [],
    center_types: []
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isOpenServices, setIsOpenServices] = useState(false);
  const [isOpenZones, setIsOpenZones] = useState(false);
  const [isOpenCenterTypes, setIsOpenCenterTypes] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedCenterTypes, setSelectedCenterTypes] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await getFilters();
      setFilters(filters);
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    let searchUrl = "https://zoi93n3tud.execute-api.us-east-1.amazonaws.com/filter-smile-centers?";
    if(isChecked) {
      searchUrl = searchUrl.concat("inclusive=true&");
    }
    selectedServices.forEach(service => {
      searchUrl = searchUrl.concat("product_id[]=").concat(encodeURIComponent(service)).concat("&");
    });
    selectedZones.forEach(zone => {
      searchUrl = searchUrl.concat("zone[]=").concat(encodeURIComponent(zone)).concat("&");
    });
    selectedCenterTypes.forEach(centerType => {
      searchUrl = searchUrl.concat("center_type[]=").concat(encodeURIComponent(centerType)).concat("&");
    });
    const fetchResults = async (url) => {
      const searchResults = await getResults(url);
      setSearchResults(searchResults);
    };
    fetchResults(searchUrl);

}, [selectedServices, selectedZones, selectedCenterTypes, isChecked]);

  const handleInputChange = (event, setSelected) => {
    if (event.target.checked) {
        setSelected(prevOptions => [...prevOptions, event.target.value]);
    } else {
        setSelected(prevOptions => prevOptions.filter(option => option !== event.target.value));
    }
  };

  const resetFilters = () => {
    setIsOpenServices(false);
    setIsOpenZones(false);
    setIsOpenCenterTypes(false);
    setSelectedServices([]);
    setSelectedZones([]);
    setSelectedCenterTypes([]);
};

  const zones = filters.zones;
  const services = filters.services;
  const centerTypes = filters.center_types;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="mb-3 text-5xl font-semibold">Moons Smile Centers</h2>
      <div className="flex space-x-4">
      <button onClick={resetFilters} className="inline-flex px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:border-transparent sm:text-sm">
        Limpiar filtros
      </button>
            <div className="relative  text-left">
                <div>
                    <button onClick={() => setIsOpenServices(!isOpenServices)} className="inline-flex w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:border-transparent sm:text-sm">
                        Selecciona los servicios a filtrar
                    </button>
                </div>

                {isOpenServices && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {services.map((element, index) => (
                            <div className="px-4 py-2">
                                <input type="checkbox" id={"option" + index} name={element} value={element} onChange={(event) => handleInputChange(event, setSelectedServices)} checked={selectedServices.includes(element)} className="rounded text-indigo-500"/>
                                <label htmlFor={"option" + index} className="ml-2">{element}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setIsOpenZones(!isOpenZones)} className="inline-flex w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:border-transparent sm:text-sm">
                        Selecciona las zonas a filtrar
                    </button>
                </div>

                {isOpenZones && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {zones.map((element, index) => (
                            <div className="px-4 py-2">
                                <input type="checkbox" id={"option" + index} name={element} value={element} onChange={(event) => handleInputChange(event, setSelectedZones)} checked={selectedZones.includes(element)} className="rounded text-indigo-500"/>
                                <label htmlFor={"option" + index} className="ml-2">{element}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setIsOpenCenterTypes(!isOpenCenterTypes)} className="inline-flex  w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:border-transparent sm:text-sm">
                        Selecciona los tipos de centro a filtrar
                    </button>
                </div>

                {isOpenCenterTypes && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {centerTypes.map((element, index) => (
                            <div className="px-4 py-2">
                                <input type="checkbox" id={"option" + index} name={element} value={element} onChange={(event) => handleInputChange(event, setSelectedCenterTypes)} checked={selectedCenterTypes.includes(element)} className="rounded text-indigo-500"/>
                                <label htmlFor={"option" + index} className="ml-2">{element}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="myCheckbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
              <label htmlFor="myCheckbox" className="ml-2">Busqueda Incluyente</label>
          </div>
        </div>

        <div class="flex flex-wrap justify-center">
              {searchResults.map((smileCenter) => (
                  <a href="#" class="block max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 relative">
                      <div class="flex items-center mb-2">
                          <img class="object-cover rounded-t-lg h-10 w-10 md:h-auto md:w-7 md:rounded-none md:rounded-s-lg"  src={smileCenter.centerIcon || 'https://moons-website-assets.s3.amazonaws.com/assets/images/moons.svg'} alt=""></img>
                          <h5 class="ml-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{smileCenter.centerName}</h5>
                      </div>
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-red-600 dark:text-white">{smileCenter.promo || 'No Aplica'}</h5>
                      <h5 class="mb-2 text-l tracking-tight text-gray-900 dark:text-white">{smileCenter.address} {smileCenter.city} - {smileCenter.country}</h5>
                      <h5 class="mb-2 text-l font-bold tracking-tight text-purple-600 dark:text-white">L- V {smileCenter.schedule.weekdays} / S {smileCenter.schedule.saturday}</h5>
                      {smileCenter.appointmentTypeIdList.map((id) => (
                          <h5 class="mb-2 text-l font-bold tracking-tight text-teal-600 dark:text-white" >{id}</h5>
                      ))}

                  </a>
              ))}
        </div>


    </main>
  );
}
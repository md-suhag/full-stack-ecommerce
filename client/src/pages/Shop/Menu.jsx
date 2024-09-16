import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  //loading data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/menu");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };
  // sorting based on A-Z, Z-A, low-high, high-low

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];
    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItems, indexOfLastItems);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* banner  */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 ">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-gray-600 text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div className="section-container">
        {/* filtering and sorting  */}
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-3 mb-8">
          {/* all category btns */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={`${selectedCategory === "all" ? "active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={`${selectedCategory === "salad" ? "active" : ""}`}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={`${selectedCategory === "pizza" ? "active" : ""}`}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={`${selectedCategory === "soup" ? "active" : ""}`}
            >
              Soup
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={`${selectedCategory === "dessert" ? "active" : ""}`}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={`${selectedCategory === "drinks" ? "active" : ""}`}
            >
              Drinks
            </button>
          </div>
          {/* filtering  */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="size-4 text-white" />
            </div>
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">low-to-high</option>
              <option value="high-to-low">high-to-low</option>
            </select>
          </div>
        </div>
        {/* product card  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
      {/* pagination section  */}
      <div className="flex flex-wrap justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;

import React, {useState} from "react";
import ProductCard from './ProductCard';
import ReactPaginate from "react-paginate";
import './ProductList.css';

const products = [
    {
      id: 0,
      name: 'Orvieto Classico',
      country: 'Italy',
      type: 'White/Dry',
      price: '289 ZŁ',
      rating: 5,
      imageUrl: 'https://picsum.photos/150/150?random=1',
    },
    {
      id: 1,
      name: 'Monastrell Salina',
      country: 'Spain',
      type: 'Red/Dry',
      price: '299 ZŁ',
      rating: 3.5,
      imageUrl: 'https://picsum.photos/150/150?random=2',
    },
    {
      id: 2,
      name: 'Château Margaux',
      country: 'France',
      type: 'Red/Dry',
      price: '1299 ZŁ',
      rating: 4.8,
      imageUrl: 'https://picsum.photos/150/150?random=3',
    },
    {
      id: 3,
      name: 'Riesling Kabinett',
      country: 'Germany',
      type: 'White/Sweet',
      price: '189 ZŁ',
      rating: 4.2,
      imageUrl: 'https://picsum.photos/150/150?random=4',
    },
    {
      id: 4,
      name: 'Malbec Reserva',
      country: 'Argentina',
      type: 'Red/Dry',
      price: '239 ZŁ',
      rating: 4.5,
      imageUrl: 'https://picsum.photos/150/150?random=5',
    },
    {
      id: 5,
      name: 'Sauvignon Blanc',
      country: 'New Zealand',
      type: 'White/Dry',
      price: '179 ZŁ',
      rating: 4.0,
      imageUrl: 'https://picsum.photos/150/150?random=6',
    },
    {
      id: 6,
      name: 'Zinfandel',
      country: 'United States',
      type: 'Red/Dry',
      price: '199 ZŁ',
      rating: 4.7,
      imageUrl: 'https://picsum.photos/150/150?random=7',
    },
    {
      id: 7,
      name: 'Rioja Reserva',
      country: 'Spain',
      type: 'Red/Dry',
      price: '219 ZŁ',
      rating: 4.4,
      imageUrl: 'https://picsum.photos/150/150?random=8',
    },
    {
      id: 8,
      name: 'Chardonnay',
      country: 'Australia',
      type: 'White/Oaked',
      price: '259 ZŁ',
      rating: 4.6,
      imageUrl: 'https://picsum.photos/150/150?random=9',
    },
    {
      id: 9,
      name: 'Pinot Noir',
      country: 'New Zealand',
      type: 'Red/Dry',
      price: '299 ZŁ',
      rating: 4.2,
      imageUrl: 'https://picsum.photos/150/150?random=10',
    },
    {
      id: 10,
      name: 'Sancerre',
      country: 'France',
      type: 'White/Dry',
      price: '189 ZŁ',
      rating: 4.8,
      imageUrl: 'https://picsum.photos/150/150?random=11',
    },
    {
      id: 11,
      name: 'Merlot',
      country: 'Chile',
      type: 'Red/Dry',
      price: '179 ZŁ',
      rating: 4.0,
      imageUrl: 'https://picsum.photos/150/150?random=12',
    },
    {
      id: 12,
      name: 'Cabernet Sauvignon',
      country: 'United States',
      type: 'Red/Dry',
      price: '349 ZŁ',
      rating: 4.9,
      imageUrl: 'https://picsum.photos/150/150?random=13',
    },
    {
      id: 13,
      name: 'Sauvignon Blanc Reserve',
      country: 'New Zealand',
      type: 'White/Dry',
      price: '279 ZŁ',
      rating: 4.7,
      imageUrl: 'https://picsum.photos/150/150?random=14',
    },
    {
      id: 14,
      name: 'Barolo Riserva',
      country: 'Italy',
      type: 'Red/Dry',
      price: '589 ZŁ',
      rating: 4.5,
      imageUrl: 'https://picsum.photos/150/150?random=15',
    },
    {
      id: 15,
      name: 'Chenin Blanc',
      country: 'South Africa',
      type: 'White/Dry',
      price: '209 ZŁ',
      rating: 4.2,
      imageUrl: 'https://picsum.photos/150/150?random=16',
    },
    {
      id: 16,
      name: 'Malbec Gran Reserva',
      country: 'Argentina',
      type: 'Red/Dry',
      price: '449 ZŁ',
      rating: 4.6,
      imageUrl: 'https://picsum.photos/150/150?random=17',
    },
    {
      id: 17,
      name: 'Syrah/Shiraz',
      country: 'Australia',
      type: 'Red/Dry',
      price: '269 ZŁ',
      rating: 4.3,
      imageUrl: 'https://picsum.photos/150/150?random=18',
    },
    {
      id: 18,
      name: 'Albariño',
      country: 'Spain',
      type: 'White/Dry',
      price: '219 ZŁ',
      rating: 4.1,
      imageUrl: 'https://picsum.photos/150/150?random=19',
    },
    {
      id: 19,
      name: 'Gewürztraminer',
      country: 'Germany',
      type: 'White/Sweet',
      price: '189 ZŁ',
      rating: 4.0,
      imageUrl: 'https://picsum.photos/150/150?random=20',
    },
    {
      id: 20,
      name: 'Cabernet Franc',
      country: 'France',
      type: 'Red/Dry',
      price: '309 ZŁ',
      rating: 4.5,
      imageUrl: 'https://picsum.photos/150/150?random=21',
    },
    {
      id: 21,
      name: 'Viognier',
      country: 'United States',
      type: 'White/Dry',
      price: '239 ZŁ',
      rating: 4.2,
      imageUrl: 'https://picsum.photos/150/150?random=22',
    },
    {
      id: 22,
      name: 'Pinotage',
      country: 'South Africa',
      type: 'Red/Dry',
      price: '189 ZŁ',
      rating: 4.0,
      imageUrl: 'https://picsum.photos/150/150?random=23',
    },
    {
      id: 23,
      name: 'Montepulciano d\'Abruzzo',
      country: 'Italy',
      type: 'Red/Dry',
      price: '199 ZŁ',
      rating: 4.3,
      imageUrl: 'https://picsum.photos/150/150?random=24',
    },
    {
      id: 24,
      name: 'Chablis',
      country: 'France',
      type: 'White/Dry',
      price: '259 ZŁ',
      rating: 4.8,
      imageUrl: 'https://picsum.photos/150/150?random=25',
    },
    {
      id: 25,
      name: 'Merlot Reserva',
      country: 'Chile',
      type: 'Red/Dry',
      price: '219 ZŁ',
      rating: 4.6,
      imageUrl: 'https://picsum.photos/150/150?random=26',
    },
    {
      id: 26,
      name: 'Zweigelt',
      country: 'Austria',
      type: 'Red/Dry',
      price: '229 ZŁ',
      rating: 4.4,
      imageUrl: 'https://picsum.photos/150/150?random=27',
    },
    {
      id: 27,
      name: 'Sémillon',
      country: 'Australia',
      type: 'White/Dry',
      price: '209 ZŁ',
      rating: 4.2,
      imageUrl: 'https://picsum.photos/150/150?random=28',
    },
    {
      id: 28,
      name: 'Carmenère',
      country: 'Chile',
      type: 'Red/Dry',
      price: '269 ZŁ',
      rating: 4.7,
      imageUrl: 'https://picsum.photos/150/150?random=29',
    },
    {
      id: 29,
      name: 'Vermentino',
      country: 'Italy',
      type: 'White/Dry',
      price: '189 ZŁ',
      rating: 4.0,
      imageUrl: 'https://picsum.photos/150/150?random=30',
    },
    {
      id: 30,
      name: 'Shiraz',
      country: 'Australia',
      type: 'Red/Dry',
      price: '319 ZŁ',
      rating: 4.9,
      imageUrl: 'https://picsum.photos/150/150?random=31',
    },
  ];

const perPage = 15;

const ProductList = ({ onAddToCart }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = products.slice(offset, offset + perPage);

    return (
      <div>
        <div className="product-list">
          {currentPageData.map((product, index) => (
            <ProductCard key={index} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(products.length / perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  };

export default ProductList;
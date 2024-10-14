import "../App.css";
import "./ProductListHeader.css";


const ProductListHeader = () => {
    return (
        <div className="header">
            {/* Overlay */}
            <div className="header-overlay"></div>
            {/* Portrait */}
            <div className="header-portrait">
                <img src="/my-steampunk-shop/images/my-portrait-image.png" alt="Steampunk Portrait" />
            </div>

            {/* A1 and A3 Content */}
            <div className="header-content">
                <h1>MY STEAMPUNK SHOP</h1>
                <h3>Accessories for Cosplay</h3></div>
        </div>
    );
};

export default ProductListHeader;

import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    renderData(item) {
        const product = new ProductComponent(document.getElementById("product-container"));
        product.render(item);
    }

    getData() {
        ajax.get(urls.getStock(this.id), (data) => {
            this.renderData(data);
            console.log(data);
        })
    }
    

    getHTML() {
        return `
            <div id="product-page">
                <div id="product-container"></div> 
                <div id="back-button-container"></div>
            </div>
        `;
    }
    
    clickBack() {
        console.log("[ProductPage] Клик по кнопке 'Назад', возврат на MainPage");

        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        const backButton = new BackButtonComponent(document.getElementById("back-button-container"))
        backButton.render(this.clickBack.bind(this))
        this.getData()

    }
}

class FilterDropdown extends HTMLElement {
    connectedCallback() {
        this.root = this.attachShadow({ mode: 'open' });
        this.render();
        this.loadCSS();
        console.log(1);
    }

    render() {
        this.aList = [];
        this.items = this.getAttribute("items").split(",").map(x => x.trim());

        this.dropdownBlock = document.createElement("div");
        this.dropdownBlock.classList.add("dropdown-block");
        this.root.append(this.dropdownBlock);

        this.mainBtn = document.createElement("button");
        this.mainBtn.innerText = "DropDown";
        this.mainBtn.classList.add("main-btn");
        this.mainBtn.addEventListener('click', () => this.dropDown());
        this.dropdownBlock.append(this.mainBtn);

        this.dropContent = document.createElement("div");
        this.dropContent.classList.add("dropdown-content");
        this.dropdownBlock.append(this.dropContent);

        this.searchBar = document.createElement("input");
        this.dropContent.append(this.searchBar);
        this.searchBar.setAttribute("placeholder", "Search..");
        this.searchBar.addEventListener('keyup', () => {
            this.filter();
        });
        this.searchBar.classList.add("drop-input");

        this.items.forEach(item => {
            let a = document.createElement("a");
            a.innerText = item;
            a.href = `#${item.toLowerCase()}`
            this.aList.push(a);
            this.dropContent.append(a);
        });
    }

    dropDown() {
        this.dropContent.classList.toggle("show");
    }

    filter() {
        const filter = this.searchBar.value.toUpperCase();
        this.aList.forEach(a => {
            let txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().includes(filter)) {
                a.style.display = "";
            } else {
                a.style.display = "none";
            }
        });
    }

    loadCSS() {
        const style = document.createElement('style');
        style.textContent = `
        .main-btn {
            background-color: #04AA6D;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .main-btn:hover, .main-btn:focus {
            background-color: #3e8e41;
        }
        
        
        .dropdown-block {
            position: relative;
            display: inline-block;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f6f6f6;
            min-width: 230px;
            overflow: auto;
            border: 1px solid #ddd;
            z-index: 1;
        }
        .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            cursor: pointer;
        }
        .dropdown-content a:hover {background-color: #ddd;}
        
        .drop-input {
            box-sizing: border-box;
            background-image: url('/search.png');
            background-position: 14px 12px;
            background-repeat: no-repeat;
            font-size: 16px;
            padding: 14px 20px 12px 45px;
            border: none;
            border-bottom: 1px solid #ddd;
        }
        .drop-input:focus {outline: 3px solid #ddd;}
        
        
          
        .dropdown-block a:hover {background-color: #ddd;}
          
        .show {display: block;}`;
        this.root.appendChild(style);
    }
}

customElements.define("filter-dropdown", FilterDropdown);
export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }
    
    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname]

        document.documentElement.classList.remove('home')
        document.documentElement.classList.remove('universe')
        document.documentElement.classList.remove('exploration')

        if(route == "/pages/home.html") {
            document.documentElement.classList.add('home')
        }
        if(route == "/pages/universe.html") {
            document.documentElement.classList.add('universe')
        }
        if(route == "/pages/exploration.html") {
            document.documentElement.classList.add('exploration')
        }
    
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
    }
}
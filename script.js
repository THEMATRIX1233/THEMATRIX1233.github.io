
        // Espera a que todo el contenido del DOM (Document Object Model) se cargue
        document.addEventListener('DOMContentLoaded', () => {
            // Selecciona todos los elementos con la clase 'topic-title'
            // Estos son los títulos de los temas en los que haremos clic
            const topicTitles = document.querySelectorAll('.topic-title');

            // Itera sobre cada título encontrado
            topicTitles.forEach(title => {
                // Añade un "escuchador de eventos" de clic a cada título
                title.addEventListener('click', () => {
                    // Busca el elemento de contenido asociado a este título.
                    // El contenido (párrafo y video) está dentro del mismo 'div.topic-item'
                    // donde está el 'h2' clicado.
                    // 'title.parentElement' nos da el 'div.topic-item'
                    // 'querySelector('.topic-content')' busca el 'div' que contiene el contenido dentro de ese 'topic-item'.
                    const content = title.parentElement.querySelector('.topic-content');

                    // Verifica si se encontró el contenido
                    if (content) {
                        // Alterna la clase 'hidden' en el elemento de contenido.
                        // Si 'content' tiene la clase 'hidden', se la quita (mostrando el contenido).
                        // Si 'content' NO tiene la clase 'hidden', se la añade (ocultando el contenido).
                        // La clase 'hidden' de Tailwind CSS hace 'display: none;'.
                        // Si no usas Tailwind, asegúrate de que tu CSS tenga:
                        // .hidden { display: none !important; }
                        // y puedes añadir estilos para .topic-content.show para display: block;
                        content.classList.toggle('hidden');

                        // Opcional: para que la página se desplace suavemente hacia el título del tema
                        // cuando se hace clic, si el contenido es largo y se sale de la vista.
                        // title.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });
            });
        });


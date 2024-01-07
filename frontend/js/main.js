document.addEventListener('DOMContentLoaded', () => {
    const topicsList = document.getElementById('topics-list');
    const detailsContainer = document.getElementById('details');
    const updateButton = document.querySelector('button');

    updateButton.addEventListener('click', updateRedditData);

    // Cargar los topics al cargar la página
    fetchTopics();

    async function updateRedditData() {
        try {
            const response = await fetch('http://localhost:3000/api/update-reddits');
            const data = await response.json();

            if (data.success) {
                // Si la actualización es exitosa, volver a cargar los topics
                clearTopicsList();
                fetchTopics();
                showTopicDetails(null); // Mostrar detalles de ejemplo
                alert('Datos de Reddit actualizados con éxito.');
            } else {
                alert('Error al actualizar los datos de Reddit.');
            }
        } catch (error) {
            console.error('Error al actualizar los datos de Reddit:', error);
            alert('Error interno del servidor al actualizar los datos de Reddit.');
        }
    }

    async function fetchTopics() {
        try {
            const response = await fetch('http://localhost:3000/api/reddits');
            const topics = await response.json();

            topics.forEach(topic => {
                const listItem = createTopicListItem(topic);
                topicsList.appendChild(listItem);
            });

            // Mostrar datos de ejemplo al cargar la página sin haber seleccionado un topic
            showTopicDetails(null);
        } catch (error) {
            console.error('Error al cargar los topics:', error);
        }
    }

    function createTopicListItem(topic) {
        const listItem = document.createElement('li');
        listItem.classList.add('topic');
        listItem.textContent = topic.display_name;

        listItem.addEventListener('click', () => {
            // Mostrar detalles del topic al hacer clic en él
            showTopicDetails(topic);
        });

        return listItem;
    }

    function clearTopicsList() {
        topicsList.innerHTML = '';
    }

    function showTopicDetails(topic) {
        // Si el topic no está definido, mostrar datos de ejemplo
        const imageSource = topic && topic.banner_img ? topic.banner_img : 'https://dummyimage.com/930x280/ededed/bdbdbd&text=No+image';

        detailsContainer.innerHTML = `
            <h2>${topic ? topic.title : 'Título'}</h2>
            <img src="${imageSource}" alt="${topic ? topic.title : 'No image'}">
            <p class="public_description">${topic ? topic.public_description : 'Descripción pública.'}</p>
            <p class="description">${topic ? topic.description : 'Descripción.'}</p>
            <a href="${topic ? 'https://www.reddit.com' + topic.url : '#'}" target="_blank">Ver en Reddit</a>
        `;
    }
});

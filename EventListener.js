/** Wilson Qiu
 * Event listener for html input 
 */
window.onload = function () {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.getElementById('search-input').value;
        // Display a loading message while the data is being fetched
        document.getElementById('results').innerHTML = 'Loading...';
        fetch(`http://localhost:3000/scrape?obj=${input}`)
            .then(response => response.json())
            .then(data => {
                // Clear the previous results
                document.getElementById('results').innerHTML = '';
                // Iterate over the items and create HTML elements for each one
                for (const item of Object.values(data)) {
                    const itemDiv = document.createElement('div');
                    itemDiv.innerHTML = `
            <h2>${item.Title}</h2>
            <p>${item.Description}</p>
            <p>Price: ${item.Price}</p>`;
                    document.getElementById('results').appendChild(itemDiv);
                }
            })
            .catch(error => {
                // Display an error message if something goes wrong
                document.getElementById('results').innerHTML = 'An error occurred, please try again later.';
                console.error(error);
            });
    });
};

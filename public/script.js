document.getElementById('queryForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const queryInput = document.getElementById('queryInput').value;
    const queryResult = document.getElementById('queryResult');
    
    try {
        console.log('Sending request to /query');
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: queryInput }),
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        // Check for errors in the HTTP response
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Response data:', data);
        
        if (data.error) {
            queryResult.textContent = 'Error: ' + data.error;
        } else {
            queryResult.textContent = `SQL Query:\n${data.sql}\n\nResult:\n${JSON.stringify(data.result, null, 2)}`;
        }
    } catch (error) {
        queryResult.textContent = 'An error occurred: ' + error.message;
        console.error('Fetch error:', error);
    }
});

// Test GET request
fetch('/test')
    .then(response => response.json())
    .then(data => console.log('Test GET response:', data))
    .catch(error => console.error('Test GET error:', error));
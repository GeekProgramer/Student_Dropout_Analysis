document.addEventListener("DOMContentLoaded", function () {
    // Initialize Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart;
    let tabledata; // Define tabledata in a higher scope

    // Function to fetch data based on selected options
    async function fetchData(category, selectedClass, year) {
        try {
            // Define the URL for the CSV file based on the selected year (assuming 'data' folder for CSV files)
            const url = `static/dataset.csv`;

            // Fetch the CSV data
            const response = await fetch(url);
            tabledata = await response.text(); // Set the tabledata variable

            // Parse the CSV data
            const labels = [];
            const data1 = [];
            const data2 = [];
            const data3 = [];

            // Find the appropriate column names based on the selected options
            const boysColumnName = `${category} - ${selectedClass} - Boys_${year}`;
            const girlsColumnName = `${category} - ${selectedClass} - Girls_${year}`;
            const totalColumnName = `${category} - ${selectedClass} - Total_${year}`;

            // Split the CSV data into rows and process each row
            const table = tabledata.split('\n').slice(1);
            table.forEach(row => {
                const column = row.split(',');
                const state = column[0];
                const boysValue = parseFloat(column[getColumnIndex(boysColumnName)]);
                const girlsValue = parseFloat(column[getColumnIndex(girlsColumnName)]);
                const totalValue = parseFloat(column[getColumnIndex(totalColumnName)]);
                labels.push(state);
                data1.push(boysValue);
                data2.push(girlsValue);
                data3.push(totalValue);
            });

            return { labels, data1, data2, data3 };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Rethrow the error to handle it further if needed
        }
    }

    // Function to get the column index based on its name
    function getColumnIndex(columnName) {
        const headers = tabledata.split('\n')[0].split(',');
        return headers.indexOf(columnName);
    }

    // Function to update the chart based on selected options
    async function updateChart() {
        const category = document.getElementById("categoryDropdown").value;
        const selectedClass = document.getElementById("classDropdown").value;
        const year = document.getElementById("yearDropdown").value;

        try {
            // Fetch data based on selected options
            const data = await fetchData(category, selectedClass, year);

            // Update or create the chart
            if (myChart) {
                myChart.destroy(); // Destroy the existing chart if it exists
            }

            myChart = new Chart(ctx, {
                type: 'line', // Change the chart type as needed
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Boys',
                            data: data.data1,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Girls',
                            data: data.data2,
                            backgroundColor: 'rgba(255, 26, 104, 0.2)',
                            borderColor: 'rgba(255, 26, 104, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Total',
                            data: data.data3,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        } catch (error) {
            console.error("Error updating chart:", error);
        }
    }

    // Add event listeners to the dropdown menus
    document.getElementById("categoryDropdown").addEventListener("change", async () => {
        await updateChart(); // Await the async function call
    });
    document.getElementById("classDropdown").addEventListener("change", async () => {
        await updateChart(); // Await the async function call
    });
    document.getElementById("yearDropdown").addEventListener("change", async () => {
        await updateChart(); // Await the async function call
    });
    // Initial chart creation with default values
    updateChart();
});

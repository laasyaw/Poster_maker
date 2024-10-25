const posterImage = localStorage.getItem("posterImage");

        if (posterImage) {
            // Display the poster
            document.getElementById("generated-poster").src = posterImage;

            // Update download link
            document.getElementById("download-link").href = posterImage;
        } else {
            alert("No poster image found. Please generate the poster first.");
            window.location.href = "edit.html"; // Redirect back if no image is found
        }
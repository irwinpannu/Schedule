document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const timeSelect = document.getElementById("time");

    // Generate time slots from 7:00 AM to 9:00 PM in 10-minute intervals
    for (let hour = 7; hour < 21; hour++) {
        for (let min = 0; min < 60; min += 10) {
            const time = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const bookingData = {
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            purpose: document.getElementById("purpose").value,
        };

        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();
            document.getElementById("confirmationMessage").textContent = result.message;
        } catch (error) {
            console.error("Error:", error);
        }
    });
});

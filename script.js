document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pcos-form");
    const outputBox = document.getElementById("output");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("name").value.trim();
        const age = parseInt(document.getElementById("age").value.trim());
        const symptoms = document.querySelectorAll('input[name="symptoms"]:checked');

        if (!username) {
            alert("Please enter your name.");
            return;
        }

        if (!age || age <= 0) {
            alert("Please enter a valid age.");
            return;
        }

        if (symptoms.length === 0) {
            alert("Please select at least one symptom.");
            return;
        }

        const checkedSymptoms = Array.from(symptoms).map((checkbox) => checkbox.value);

        let analysis = "";
        if (checkedSymptoms.length > 2) {
            analysis = `Based on your input, you may have some symptoms associated with PCOS/PCOD. 
                        We recommend consulting a healthcare professional for further evaluation and diagnosis.`;
        } else {
            analysis = `Based on your input, the likelihood of PCOS/PCOD may be lower. 
                        However, it's always best to consult a healthcare professional for personalized advice.`;
        }

        outputBox.innerHTML = `
            <h3>Analysis for ${username}</h3>
            <p>${analysis}</p>
        `;
        outputBox.style.display = "block";
    });

    // 🩸 Cycle Tracker Logic
    const trackBtn = document.getElementById("track-btn");
    trackBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const lastPeriodDate = document.getElementById("last-period").value;
        const cycleLength = parseInt(document.getElementById("cycle-length").value);

        if (!lastPeriodDate || isNaN(cycleLength) || cycleLength <= 0) {
            alert("Please enter valid period date and cycle length.");
            return;
        }

        const lastDate = new Date(lastPeriodDate);
        lastDate.setDate(lastDate.getDate() + cycleLength);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        alert(`Your next expected period date is: ${lastDate.toLocaleDateString('en-IN', options)}`);
    });

    // Kommunicate chatbot code
    (function(d, m){
        var kommunicateSettings = {
          "appId":"34f44a379b05d2df6cf76d56c69a436f4",
          "popupWidget":true,
          "automaticChatOpenOnNavigation":true
        };
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
});

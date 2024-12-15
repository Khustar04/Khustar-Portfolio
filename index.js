document.addEventListener('DOMContentLoaded', function() {
    const textArray = [
        "Web Developer",
        "Frontend Developer",
        "UI/UX Designer",
        "React Developer",
        "Full Stack Developer",
        "JavaScript Developer"
    ];

    let currentIndex = 0;
    const textElement = document.getElementById('changing-text');
    let isDeleting = false;
    let charIndex = 0;
    let typingSpeed = 100; 
    let pauseAfterTyping = 800; 

    function typeText() {
        if (textElement) {
            const currentText = textArray[currentIndex];
            
            const displayText = isDeleting
                ? currentText.substring(0, charIndex - 1)
                : currentText.substring(0, charIndex + 1);
                
            textElement.textContent = displayText + "|"; 

            if (isDeleting) {
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % textArray.length;
                    setTimeout(typeText, pauseAfterTyping);
                } else {
                    setTimeout(typeText, typingSpeed);
                }
            } else {
                charIndex++;
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeText, pauseAfterTyping);
                } else {
                    setTimeout(typeText, typingSpeed);
                }
            }
        }
    }
    
    typeText();
});

// Download CV requests -------->
document.getElementById('downloadCV').addEventListener('click', function() {
    // REPLACE THIS WITH YOUR ACTUAL RESUME URL
    const resumeUrl = 'https://drive.google.com/drive/folders/1MwkJFpOkOem_07twr47CRiZ0uCEvnfFB?dmr=1&ec=wgc-drive-globalnav-goto';
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = resumeUrl;
    
    // Set the download attribute with desired filename
    link.download = 'Khustar Hussain_Resume.pdf';
    
    // Append to the body, click programmatically, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
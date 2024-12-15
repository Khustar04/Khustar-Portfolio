// Add modal HTML to the document
const modalHTML = `
<div id="formModal" class="modal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);">
    <div class="modal-content" style="background-color: white; margin: 15% auto; padding: 20px; border-radius: 8px; position: relative; width: 90%; max-width: 400px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <span class="close-modal" style="position: absolute; right: 15px; top: 10px; font-size: 24px; cursor: pointer; color: #666;">&times;</span>
        <div id="modalMessage" style="margin-top: 10px; text-align: center; color: #333;"></div>
        <div id="loadingSpinner" style="display: none; text-align: center; margin-top: 15px;">
            <div style="border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
    </div>
</div>
<style>
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .modal-content {
        animation: modalSlide 0.3s ease-out;
    }
    @keyframes modalSlide {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
</style>
`;

// Add modal to document
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Form handling script
const handleForm = {
    // Your Google Apps Script URL
    scriptURL: 'https://script.google.com/macros/s/AKfycbwRNoBA7XXkSq6ibtMiCSxC67WZxYETTUXmRAjDHji-EGnaUT3nIk3JmAb3u6YiWoV0/exec',
    form: document.getElementById('contactForm'),
    modal: document.getElementById('formModal'),
    modalMessage: document.getElementById('modalMessage'),
    spinner: document.getElementById('loadingSpinner'),
    submitButton: document.getElementById('submitButton'),

    // Initialize the form handler
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add modal close handlers
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') this.closeModal();
        });
    },

    // Show modal with message
    showModal(message, isLoading = false) {
        this.modalMessage.textContent = message;
        this.spinner.style.display = isLoading ? 'block' : 'none';
        this.modal.style.display = 'block';
    },

    // Close modal
    closeModal() {
        this.modal.style.display = 'none';
        this.spinner.style.display = 'none';
    },

    // Handle form submission
    async handleSubmit(e) {
        e.preventDefault();

        // Disable submit button and show loading state
        this.submitButton.disabled = true;
        this.showModal('Submitting your message...', true);

        try {
            // Get form data
            const formData = new FormData(this.form);
            
            // Validate form data
            const name = formData.get('NAME').trim();
            const email = formData.get('EMAILS').trim();
            const message = formData.get('MESSAGES').trim();

            if (!name || !email || !message) {
                throw new Error('Please fill in all fields');
            }

            // Send form data
            const response = await fetch(this.scriptURL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            
            // Show success message
            this.showModal('Thank you! Your message has been sent successfully. We will get back to you soon.');
            
            // Reset form
            this.form.reset();

        } catch (error) {
            console.error('Error:', error);
            this.showModal('Sorry, something went wrong. Please try again later.');
        } finally {
            // Re-enable submit button
            this.submitButton.disabled = false;
        }
    }
};

// Initialize form handler when document is ready
document.addEventListener('DOMContentLoaded', () => handleForm.init());
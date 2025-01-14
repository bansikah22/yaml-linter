// Function to update line numbers in the textarea
function updateLineNumbers() {
    const yamlInput = document.getElementById('yaml-input');
    const lineNumbers = document.getElementById('line-numbers');
    const lines = yamlInput.value.split('\n').length;
    lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => i + 1).join('\n');
}

// Update line numbers on input change
document.getElementById('yaml-input').addEventListener('input', updateLineNumbers);

// Sync scroll between line numbers and textarea
document.getElementById('yaml-input').addEventListener('scroll', function() {
    document.getElementById('line-numbers').scrollTop = this.scrollTop;
});

// Initial call to display line numbers
updateLineNumbers();

// Function to lint YAML input and display errors
document.getElementById('lint-button').addEventListener('click', () => {
    const yamlInput = document.getElementById('yaml-input').value;
    const lintOutput = document.getElementById('lint-output');
    
    try {
        // Parse the YAML input using jsyaml
        const parsedYAML = jsyaml.load(yamlInput);
        lintOutput.innerHTML = '<span class="success">✓ YAML is valid!</span>';
        lintOutput.className = 'success';
    } catch (e) {
        // Display error with line number and message
        const errorLine = e.mark ? e.mark.line + 1 : 'unknown';
        lintOutput.innerHTML = `<span class="error">✗ Error on line ${errorLine}: ${e.message}</span>`;
        lintOutput.className = 'error';
    }
});

// Persist code in localStorage when content is entered
const yamlInput = document.getElementById('yaml-input');
const storedCode = localStorage.getItem('yamlCode'); // Retrieve stored code

// If there is stored code, load it into the textarea
if (storedCode) {
    yamlInput.value = storedCode;
    updateLineNumbers(); // Recalculate line numbers based on stored code
}

// Save code to localStorage whenever the user types
yamlInput.addEventListener('input', function() {
    localStorage.setItem('yamlCode', yamlInput.value); // Save code to localStorage
});

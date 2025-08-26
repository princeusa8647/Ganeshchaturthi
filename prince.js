class ACIGanpatiExperience {
    constructor() {
        this.currentTone = 'formal';
        this.userName = '';
        this.relationName = '';
        this.generatedWish = '';
        this.init();
    }

    init() {
        this.startConfetti();
        this.startAutoTyping();
        this.setupEventListeners();
    }

    startConfetti() {
        const confettiEmojis = ['🎉', '🎊', '🌸', '🌺', '🪔', '🕉️', '🙏', '✨'];
        const container = document.getElementById('confettiContainer');
        
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    container.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }, i * 200);
            }
        }, 2000);
    }

    startAutoTyping() {
        const messages = [
            'ACI Computer Institute wishes you Happy Ganesh Chaturthi! 🎉',
            'गणेश चतुर्थी की हार्दिक शुभकामनाएं! 🙏',
            'Create personalized wishes for your loved ones! ✨',
            'व्यक्तिगत शुभकामनाएं बनाएं और शेयर करें! 📱'
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        const typingElement = document.getElementById('typingText');
        
        const typeMessage = () => {
            if (charIndex < messages[messageIndex].length) {
                typingElement.textContent += messages[messageIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, 100);
            } else {
                setTimeout(() => {
                    typingElement.textContent = '';
                    charIndex = 0;
                    messageIndex = (messageIndex + 1) % messages.length;
                    setTimeout(typeMessage, 500);
                }, 3000);
            }
        };
        
        typeMessage();
    }

    setupEventListeners() {
        // Tone selector
        document.querySelectorAll('.tone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTone = e.target.dataset.tone;
            });
        });

        // Enter key listeners
        document.getElementById('userName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('relationName').focus();
        });

        document.getElementById('relationName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generatePersonalizedWish();
        });
    }

    generatePersonalizedWish() {
        this.userName = document.getElementById('userName').value.trim();
        this.relationName = document.getElementById('relationName').value.trim();
        
        if (!this.userName) {
            alert('कृपया अपना नाम लिखें');
            document.getElementById('userName').focus();
            return;
        }

        if (!this.relationName) {
            alert('कृपया बताएं कि यह शुभकामनाएँ किसके लिए है');
            document.getElementById('relationName').focus();
            return;
        }

        const generateBtn = document.getElementById('generateBtn');
        generateBtn.innerHTML = '<span class="loading"></span> बना रहे हैं...';
        generateBtn.disabled = true;

        // Simulate AI generation with realistic delay
        setTimeout(() => {
            this.generatedWish = this.createPersonalizedWish();
            this.displayWish();
            generateBtn.innerHTML = '✨ शुभकामना बनाएं';
            generateBtn.disabled = false;
        }, 2000);
    }

    createPersonalizedWish() {
        const wishes = {
            formal: [
                `🙏 प्रिय ${this.relationName} जी,\n\nगणेश चतुर्थी के इस पावन अवसर पर ${this.userName} की तरफ से आपको हार्दिक शुभकामनाएं!\n\nभगवान गणेश आपके जीवन में सुख, समृद्धि और सफलता लाएं। आपके सभी विघ्न दूर हों और मनोकामनाएं पूर्ण हों।\n\n🌺 गणपति बप्पा मोरया! 🌺\n\n- ${this.userName}\n🎓 ACI Computer Institute`,
                
                `🕉️ आदरणीय ${this.relationName},\n\n${this.userName} की ओर से गणेश चतुर्थी की मंगलकामनाएं!\n\nविघ्नहर्ता गणेश जी आपके जीवन पथ से सभी बाधाओं को दूर करें और आपको नई ऊंचाइयों तक पहुंचाएं।\n\n🪔 मंगलमूर्ति मोरया! 🪔\n\nशुभकामनाओं सहित,\n${this.userName}`
            ],
            
            emotional: [
                `❤️ मेरे प्यारे ${this.relationName},\n\nगणेश चतुर्थी के इस खुशी के मौके पर ${this.userName} का दिल भर आया है। आप मेरी जिंदगी में कितने खास हैं, यह बताने के लिए शब्द कम हैं।\n\nगणपति बप्पा से दुआ है कि आपकी हर मुस्कान बनी रहे और आपके सपने सच हों। आप हमेशा खुश रहें! 🥺💕\n\n🌸 गणपति बप्पा मोरया! 🌸\n\nढेर सारा प्यार,\n${this.userName}`,
                
                `💖 ${this.relationName}, मेरे दिल के टुकड़े,\n\n${this.userName} की तरफ से गणेश चतुर्थी की ढेर सारी शुभकामनाएं!\n\nआपके बिना यह त्योहार अधूरा लगता है। गणेश जी से प्रार्थना है कि आप हमेशा स्वस्थ और खुश रहें। आपकी हंसी ही मेरी खुशी है! 😊\n\n🙏 बप्पा आपको हमेशा खुश रखे! 🙏\n\nअपार स्नेह के साथ,\n${this.userName}`
            ],
            
            funny: [
                `😄 अरे ${this.relationName}!\n\n${this.userName} की तरफ से गणेश चतुर्थी की धमाकेदार शुभकामनाएं! 🎉\n\nगणेश जी से विनती है कि आपके सारे दुख-दर्द को अपनी सूंड में लपेटकर ले जाएं और खुशियों की बारिश कर दें! 🐘💦\n\nऔर हां, इस बार मोदक खाते समय पेट का भी ख्याल रखना! 😂🍬\n\n🤣 गणपति बप्पा मोरया (और हमारा पेट भी मोरया)! 🤣\n\nहंसते रहिए,\n${this.userName}`,
                
                `🤪 हैलो ${this.relationName} भाई/बहन!\n\n${this.userName} की तरफ से गणेश चतुर्थी की मस्त शुभकामनाएं! 🎊\n\nगणेश जी से कहा है कि आपकी सारी परेशानियों को अपनी सूंड से उड़ा दें और आपको इतनी खुशियां दें कि आप खुशी से नाचने लगें! 💃🕺\n\nबस एक बात - मोदक शेयर करना मत भूलना! 😋\n\n🐘 बप्पा मोरया, मंगल करी मोरया! 🐘\n\nमस्ती के साथ,\n${this.userName}`
            ]
        };

        const toneWishes = wishes[this.currentTone];
        return toneWishes[Math.floor(Math.random() * toneWishes.length)];
    }

    displayWish() {
        document.getElementById('wishText').textContent = this.generatedWish;
        document.getElementById('wishDisplay').style.display = 'block';
        document.getElementById('wishDisplay').scrollIntoView({ behavior: 'smooth' });
        
        // Create celebration
        this.createCelebration();
    }

    createCelebration() {
        const colors = ['#FFD700', '#FF6B35', '#DC143C', '#6A0572', '#27AE60'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.position = 'fixed';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                firework.style.width = '8px';
                firework.style.height = '8px';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                firework.style.borderRadius = '50%';
                firework.style.pointerEvents = 'none';
                firework.style.zIndex = '999';
                firework.style.animation = 'celebrationExplode 2s ease-out forwards';
                
                document.body.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 2000);
            }, i * 100);
        }
    }

    shareToWhatsApp() {
        const shareText = encodeURIComponent(this.generatedWish + '\n\n🎓 ACI Computer Institute\n📞 9576737726 | 8540858926\n💻 Coded by Prince Singh');
        window.open(`https://wa.me/?text=${shareText}`, '_blank');
    }

    downloadWishCard() {
        // Create canvas for wish card
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 1000;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 800, 1000);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#f093fb');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 1000);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        
        const lines = this.generatedWish.split('\n');
        let y = 200;
        lines.forEach(line => {
            if (line.trim()) {
                ctx.fillText(line, 400, y);
                y += 40;
            } else {
                y += 20;
            }
        });

        // Download
        const link = document.createElement('a');
        link.download = `Ganesh_Wishes_${this.userName}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }

    regenerateWish() {
        this.generatePersonalizedWish();
    }

    submitLead(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const leadData = Object.fromEntries(formData);
        
        // Simulate form submission
        setTimeout(() => {
            document.getElementById('successModal').style.display = 'flex';
            event.target.reset();
            
            // Store lead data (in real app, send to backend)
            console.log('Lead captured:', leadData);
        }, 1000);
    }

    closeModal() {
        document.getElementById('successModal').style.display = 'none';
    }

    openPrinceModal() {
        alert('💻 Prince Singh - Beginner \n\n🚀  Follow on Instagram: @prince_singh\n📧 Contact for projects & collaborations!');
    }
}

// Global functions for HTML onclick events
function generatePersonalizedWish() {
    aciApp.generatePersonalizedWish();
}

function shareToWhatsApp() {
    aciApp.shareToWhatsApp();
}

function downloadWishCard() {
    aciApp.downloadWishCard();
}

function regenerateWish() {
    aciApp.regenerateWish();
}

function submitLead(event) {
    aciApp.submitLead(event);
}

function closeModal() {
    aciApp.closeModal();
}

function openPrinceModal() {
    aciApp.openPrinceModal();
}

// Initialize app when DOM is loaded
let aciApp;
document.addEventListener('DOMContentLoaded', () => {
    aciApp = new ACIGanpatiExperience();
});
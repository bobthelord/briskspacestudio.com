// javascript
/* =========================================================
   BRISK SPACES
   RESPONSIVE JAVASCRIPT
   Header • Mobile Menu • Cart • Scroll • Reveal • Form
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const body = document.body;

    const introScreen = document.getElementById("introScreen");

    const header = document.getElementById("header");

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");

    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const cartOverlay = document.getElementById("cartOverlay");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");


    /* =====================================================
       STATE
    ===================================================== */

    let cart = [];

    let menuIsOpen = false;
    let cartIsOpen = false;

    let introFinished = !introScreen;


    /* =====================================================
       CART STORAGE
    ===================================================== */

    try {

        const savedCart = localStorage.getItem("briskSpacesCart");

        if (savedCart) {

            const parsedCart = JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {

                cart = parsedCart.filter(
                    item => typeof item === "string"
                );

            }

        }

    } catch (error) {

        console.warn(
            "Brisk Spaces: Could not restore cart.",
            error
        );

    }


    const saveCart = () => {

        try {

            localStorage.setItem(
                "briskSpacesCart",
                JSON.stringify(cart)
            );

        } catch (error) {

            console.warn(
                "Brisk Spaces: Could not save cart.",
                error
            );

        }

    };


    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    const updateScrollLock = () => {

        const shouldLock =
            menuIsOpen ||
            cartIsOpen ||
            !introFinished;

        body.classList.toggle(
            "locked",
            shouldLock
        );

    };


    /* =====================================================
       INTRO SCREEN
    ===================================================== */

    const startIntro = () => {

        if (!introScreen) {

            introFinished = true;

            updateScrollLock();

            return;

        }

        introFinished = false;

        body.classList.add("locked");

        const finishIntro = () => {

            if (introFinished) return;

            introFinished = true;

            introScreen.classList.add("hide");

            updateScrollLock();

        };


        /*
         * Allow the page to render before starting
         * the intro transition.
         */

        requestAnimationFrame(() => {

            setTimeout(
                finishIntro,
                2600
            );

        });


        /*
         * Prevent the intro from blocking the
         * website forever if loading is unusual.
         */

        setTimeout(
            finishIntro,
            5000
        );

    };


    startIntro();


    /* =====================================================
       HEADER
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        const scrollPosition = window.scrollY;

        header.classList.toggle(
            "scrolled",
            scrollPosition > 30
        );

        /*
         * CSS can use this variable to calculate
         * responsive spacing if desired.
         */

        document.documentElement.style.setProperty(
            "--header-height",
            `${header.offsetHeight}px`
        );

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateHeader
    );


    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const openMenu = () => {

        if (!mobileMenu) return;

        /*
         * Close cart before opening menu.
         */

        if (cartIsOpen) {

            closeCartPanel();

        }

        menuIsOpen = true;

        mobileMenu.classList.add("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }

        updateScrollLock();

    };


    const closeMenu = () => {

        if (!mobileMenu) return;

        menuIsOpen = false;

        mobileMenu.classList.remove("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

        updateScrollLock();

    };


    const toggleMenu = () => {

        if (menuIsOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            toggleMenu
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /*
     * Close menu when navigation link is clicked.
     */

    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );

        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });

    }


    /* =====================================================
       CART
    ===================================================== */

    const openCart = () => {

        if (!cartPanel) return;

        /*
         * Close mobile menu before opening cart.
         */

        if (menuIsOpen) {

            closeMenu();

        }

        cartIsOpen = true;

        cartPanel.classList.add("open");

        if (cartOverlay) {

            cartOverlay.classList.add("open");

            cartOverlay.setAttribute(
                "aria-hidden",
                "false"
            );

        }

        cartPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        if (cartButton) {

            cartButton.setAttribute(
                "aria-expanded",
                "true"
            );

            cartButton.setAttribute(
                "aria-label",
                "Close collection"
            );

        }

        updateScrollLock();

    };


    const closeCartPanel = () => {

        if (!cartPanel) return;

        cartIsOpen = false;

        cartPanel.classList.remove("open");

        if (cartOverlay) {

            cartOverlay.classList.remove("open");

            cartOverlay.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        cartPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        if (cartButton) {

            cartButton.setAttribute(
                "aria-expanded",
                "false"
            );

            cartButton.setAttribute(
                "aria-label",
                "Open collection"
            );

        }

        updateScrollLock();

    };


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            () => {

                if (cartIsOpen) {

                    closeCartPanel();

                } else {

                    openCart();

                }

            }
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartPanel
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCartPanel
        );

    }


    /* =====================================================
       CART RENDER
    ===================================================== */

    const renderCart = () => {

        if (cartCount) {

            cartCount.textContent = cart.length;

            cartCount.classList.toggle(
                "has-items",
                cart.length > 0
            );

        }


        if (!cartItems) return;


        /*
         * Empty cart.
         */

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Your collection is currently empty.
                </p>
            `;

            return;

        }


        /*
         * Render cart items.
         */

        cartItems.innerHTML = cart
            .map((product, index) => {

                return `
                    <div class="cart-item">

                        <div class="cart-item-name">
                            <strong>
                                ${escapeHTML(product)}
                            </strong>
                        </div>

                        <button
                            type="button"
                            class="remove-cart"
                            data-index="${index}"
                            aria-label="Remove ${escapeHTML(product)}"
                        >
                            <span
                                class="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                close
                            </span>
                        </button>

                    </div>
                `;

            })
            .join("");


        /*
         * Remove buttons.
         */

        cartItems
            .querySelectorAll(".remove-cart")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        if (
                            Number.isInteger(index) &&
                            index >= 0 &&
                            index < cart.length
                        ) {

                            cart.splice(index, 1);

                            saveCart();

                            renderCart();

                        }

                    }
                );

            });

    };


    /* =====================================================
       ADD PRODUCTS TO CART
    ===================================================== */

    const addToCartButtons =
        document.querySelectorAll(
            ".add-cart"
        );


    addToCartButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const product =
                    button.dataset.product;


                if (!product) return;


                cart.push(product);

                saveCart();

                renderCart();

                openCart();


                /*
                 * Button feedback.
                 */

                const originalContent =
                    button.innerHTML;

                const originalWidth =
                    button.offsetWidth;


                button.style.minWidth =
                    `${originalWidth}px`;

                button.disabled = true;

                button.classList.add(
                    "added"
                );


                button.innerHTML = `
                    Added
                    <span
                        class="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        check
                    </span>
                `;


                setTimeout(() => {

                    button.innerHTML =
                        originalContent;

                    button.disabled = false;

                    button.classList.remove(
                        "added"
                    );

                    button.style.minWidth =
                        "";

                }, 1200);

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL NAVIGATION
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                let target = null;

                try {

                    target =
                        document.querySelector(
                            targetID
                        );

                } catch (error) {

                    return;

                }


                if (!target) return;


                event.preventDefault();


                closeMenu();
                closeCartPanel();


                /*
                 * Give the responsive header
                 * time to close before calculating
                 * its height.
                 */

                requestAnimationFrame(() => {

                    const headerOffset =
                        header
                            ? header.offsetHeight + 15
                            : 20;


                    const targetTop =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerOffset;


                    window.scrollTo({

                        top: Math.max(
                            0,
                            targetTop
                        ),

                        behavior: "smooth"

                    });

                });

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .about-grid,
            .about-statement,
            .service-card,
            .shop-grid,
            .product-card,
            .contact-grid,
            .contact-details
            `
        );


    revealElements.forEach(element => {

        element.classList.add(
            "reveal"
        );

    });


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.1,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    );

                const email =
                    document.getElementById(
                        "email"
                    );

                const message =
                    document.getElementById(
                        "message"
                    );


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    return;

                }


                const nameValue =
                    name.value.trim();

                const emailValue =
                    email.value.trim();

                const messageValue =
                    message.value.trim();


                if (
                    !nameValue ||
                    !emailValue ||
                    !messageValue
                ) {

                    showFormMessage(
                        "Please complete all fields.",
                        true
                    );

                    return;

                }


                if (
                    !isValidEmail(
                        emailValue
                    )
                ) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        true
                    );

                    return;

                }


                /*
                 * UI confirmation.
                 *
                 * Connect EmailJS, Formspree,
                 * Netlify Forms, or your backend
                 * here when you want real delivery.
                 */

                showFormMessage(
                    "Thank you. Your enquiry has been received.",
                    false
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    const showFormMessage = (
        message,
        isError = false
    ) => {

        if (!formStatus) return;


        formStatus.textContent =
            message;


        formStatus.style.opacity =
            "1";


        formStatus.setAttribute(
            "aria-live",
            "polite"
        );


        formStatus.classList.toggle(
            "form-error",
            isError
        );

    };


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const isValidEmail = email => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                email.trim()
            );

    };


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    const escapeHTML = value => {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    };


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            if (menuIsOpen) {

                closeMenu();

            }


            if (cartIsOpen) {

                closeCartPanel();

            }

        }
    );


    /* =====================================================
       RESPONSIVE RESIZE
    ===================================================== */

    const handleResize = () => {

        /*
         * Desktop breakpoint.
         *
         * This matches a common responsive
         * CSS breakpoint while still allowing
         * tablets to use the mobile menu.
         */

        if (
            window.innerWidth > 1000 &&
            menuIsOpen
        ) {

            closeMenu();

        }


        /*
         * Prevent mobile menu from remaining
         * visually active after orientation changes.
         */

        if (
            window.innerWidth > 1000 &&
            mobileMenu
        ) {

            mobileMenu.classList.remove(
                "open"
            );

        }


        updateHeader();

    };


    window.addEventListener(
        "resize",
        handleResize
    );


    /*
     * Mobile browser orientation changes.
     */

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                updateHeader,
                150
            );

        }
    );


    /* =====================================================
       ACCESSIBILITY INITIAL STATE
    ===================================================== */

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (cartButton) {

        cartButton.setAttribute(
            "aria-expanded",
            "false"
        );

        cartButton.setAttribute(
            "aria-label",
            "Open collection"
        );

    }


    if (cartPanel) {

        cartPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (cartOverlay) {

        cartOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderCart();

    updateHeader();

});


/* Contact-form fallback for pages without an EmailJS configuration. */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;
    form.addEventListener("submit", (event) => {
        if (typeof emailjs !== "undefined" && window.EMAILJS_CONFIG) return;
        event.preventDefault();
        status.textContent = "Thank you. Your enquiry is ready to be reviewed. Please contact us directly to confirm receipt.";
        status.className = "form-status success";
        form.reset();
    });
});

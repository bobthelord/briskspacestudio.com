/* =========================================================
   BRISK SPACES
   CLEAN RESPONSIVE JAVASCRIPT
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


    /* =====================================================
       INTRO SCREEN
    ===================================================== */

    const startIntro = () => {

        if (!introScreen) return;

        body.classList.add("locked");

        window.addEventListener("load", () => {

            setTimeout(() => {

                introScreen.classList.add("hide");

                /*
                 * Restore scrolling after intro animation.
                 */

                if (!menuIsOpen && !cartIsOpen) {
                    body.classList.remove("locked");
                }

            }, 2800);

        });

    };

    startIntro();


    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    const updateScrollLock = () => {

        if (menuIsOpen || cartIsOpen) {

            body.classList.add("locked");

        } else {

            body.classList.remove("locked");

        }

    };


    /* =====================================================
       HEADER
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        const scrollPosition = window.scrollY;

        if (scrollPosition > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const openMenu = () => {

        if (!mobileMenu) return;

        menuIsOpen = true;

        mobileMenu.classList.add("open");

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        updateScrollLock();

    };


    const closeMenu = () => {

        if (!mobileMenu) return;

        menuIsOpen = false;

        mobileMenu.classList.remove("open");

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        updateScrollLock();

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMenu
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /*
     * Close menu when a mobile navigation link
     * is selected.
     */

    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    /* =====================================================
       CART
    ===================================================== */

    const openCart = () => {

        if (!cartPanel || !cartOverlay) return;

        cartIsOpen = true;

        cartPanel.classList.add("open");

        cartOverlay.classList.add("open");

        if (cartButton) {

            cartButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        updateScrollLock();

    };


    const closeCartPanel = () => {

        if (!cartPanel || !cartOverlay) return;

        cartIsOpen = false;

        cartPanel.classList.remove("open");

        cartOverlay.classList.remove("open");

        if (cartButton) {

            cartButton.setAttribute(
                "aria-expanded",
                "false"
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

        if (!cartItems || !cartCount) return;


        /*
         * Update cart counter.
         */

        cartCount.textContent = cart.length;


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
         * Build cart items.
         */

        cartItems.innerHTML = cart
            .map((product, index) => {

                return `
                    <div class="cart-item">

                        <div>
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
                            <span class="material-symbols-outlined">
                                close
                            </span>
                        </button>

                    </div>
                `;

            })
            .join("");


        /*
         * Add remove functionality.
         */

        const removeButtons =
            cartItems.querySelectorAll(".remove-cart");


        removeButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    if (
                        Number.isInteger(index) &&
                        index >= 0 &&
                        index < cart.length
                    ) {

                        cart.splice(index, 1);

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
        document.querySelectorAll(".add-cart");


    addToCartButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const product =
                    button.dataset.product;


                if (!product) return;


                cart.push(product);

                renderCart();

                openCart();


                /*
                 * Temporary button feedback.
                 */

                const originalContent =
                    button.innerHTML;


                button.disabled = true;


                button.innerHTML = `
                    Added
                    <span class="material-symbols-outlined">
                        check
                    </span>
                `;


                setTimeout(() => {

                    button.innerHTML =
                        originalContent;

                    button.disabled = false;

                }, 1200);

            }
        );

    });


    renderCart();


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
                    link.getAttribute("href");


                /*
                 * Ignore empty anchors.
                 */

                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetID);


                if (!target) return;


                event.preventDefault();


                /*
                 * Close overlays first.
                 */

                closeMenu();

                closeCartPanel();


                /*
                 * Header offset.
                 */

                const headerOffset =
                    header
                        ? header.offsetHeight + 20
                        : 20;


                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({

                    top: targetTop,

                    behavior: "smooth"

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

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

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

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /*
         * Fallback for older browsers.
         */

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

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
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const message =
                    document.getElementById("message");


                /*
                 * Basic validation.
                 */

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    return;

                }


                if (
                    !name.value.trim() ||
                    !email.value.trim() ||
                    !message.value.trim()
                ) {

                    showFormMessage(
                        "Please complete all fields.",
                        true
                    );

                    return;

                }


                if (
                    !isValidEmail(email.value)
                ) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        true
                    );

                    return;

                }


                /*
                 * This is the UI confirmation.
                 *
                 * Connect EmailJS here if you want
                 * the form to send real emails.
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

        formStatus.textContent = message;

        formStatus.style.opacity = "1";

        formStatus.setAttribute(
            "aria-live",
            "polite"
        );


        if (isError) {

            formStatus.classList.add(
                "form-error"
            );

        } else {

            formStatus.classList.remove(
                "form-error"
            );

        }

    };


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const isValidEmail = email => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email.trim());

    };


    /* =====================================================
       ESCAPE HTML
       Prevents product names from injecting HTML.
    ===================================================== */

    const escapeHTML = value => {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    };


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
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
         * When moving from mobile to desktop,
         * remove the mobile menu state.
         */

        if (
            window.innerWidth > 900 &&
            menuIsOpen
        ) {

            closeMenu();

        }


        /*
         * Keep header state correct after resizing.
         */

        updateHeader();

    };


    window.addEventListener(
        "resize",
        handleResize
    );


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (cartButton) {

        cartButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateHeader();

    renderCart();

});


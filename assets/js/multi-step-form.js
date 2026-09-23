/**
 * Contact Form 7 Multi Step Form
 *
 * 1つのCF7フォーム内にあるSTEP1〜5を
 * JavaScriptで表示切り替えする。
 *
 * 【クライアント側の役割】
 *
 * このファイルはユーザーのブラウザ上で動く。
 *
 * - STEP表示切り替え
 * - 次へ / 戻る
 * - 入力値保持
 * - 進捗表示
 * - 各STEPの入力チェック
 * - STEP5送信前チェック
 * - 二重送信防止
 * - 送信中のボタン制御
 *
 * JavaScriptは無効化・改変できるため、
 * 最終的な入力チェックはPHP / CF7側でも行う。
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       Form
    ================================================== */

    const formContainer =
        document.querySelector(
            ".contact-form"
        );


    if (!formContainer) {
        return;
    }


    const form =
        formContainer.querySelector(
            ".wpcf7-form"
        );


    if (!form) {
        return;
    }


    /*
     * Contact Form 7がイベントを発火する
     * .wpcf7要素。
     */
    const cf7Root =
        form.closest(".wpcf7");


    /* ==================================================
       Elements
    ================================================== */

    const steps = Array.from(
        form.querySelectorAll(
            ".js-form-step"
        )
    );


    const nextButtons =
        form.querySelectorAll(
            ".js-next-step"
        );


    const prevButtons =
        form.querySelectorAll(
            ".js-prev-step"
        );


    const progressStep =
        form.querySelector(
            ".js-progress-step"
        );


    const progressName =
        form.querySelector(
            ".js-progress-name"
        );


    const progressBar =
        form.querySelector(
            ".js-progress-bar"
        );


    const progressDots = Array.from(
        form.querySelectorAll(
            ".contact-progress__steps span"
        )
    );


    const submitButton =
        form.querySelector(
            'input[type="submit"]'
        );


    if (!steps.length) {
        return;
    }


    /*
     * 配列indexで現在STEPを管理する。
     *
     * STEP1 = 0
     * STEP2 = 1
     * STEP3 = 2
     * STEP4 = 3
     * STEP5 = 4
     */
    let currentStep = 0;


    /*
     * 二重送信防止用。
     *
     * trueの間は
     * 追加のsubmitを受け付けない。
     */
    let isSubmitting = false;


    /*
     * 送信ボタンの元テキストを保持する。
     */
    const originalSubmitText =
        submitButton?.value
        ?? "無料体験を申し込む";


    /* ==================================================
       Error
    ================================================== */

    /**
     * JavaScript側で表示した
     * エラーメッセージを削除する。
     */
    const removeErrors = (step) => {

        step
            .querySelectorAll(
                ".js-step-error"
            )
            .forEach((error) => {

                error.remove();

            });

    };


    /**
     * JavaScript側の
     * エラーメッセージを表示する。
     */
    const showError = (
        target,
        message
    ) => {

        if (!target) {
            return;
        }


        const error =
            document.createElement("p");


        error.className =
            "contact-field-error js-step-error";


        error.textContent =
            message;


        target.appendChild(error);

    };


    /* ==================================================
       Scroll Error
    ================================================== */

    /**
     * バリデーションエラー時に
     * 最初のエラー位置へスクロールする。
     */
    const scrollToError = (step) => {

        const error =
            step.querySelector(
                ".js-step-error"
            );


        if (!error) {
            return;
        }


        error.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

    };


    /* ==================================================
       Submit Button
    ================================================== */

    /**
     * 送信処理開始。
     *
     * ボタンを無効化して
     * 連打による二重送信を防止する。
     */
    const startSubmitting = () => {

        isSubmitting = true;


        if (!submitButton) {
            return;
        }


        submitButton.disabled = true;

        submitButton.value =
            "送信中...";

    };


    /**
     * 送信失敗・入力エラー時に
     * ボタンを元へ戻す。
     */
    const resetSubmitting = () => {

        isSubmitting = false;


        if (!submitButton) {
            return;
        }


        submitButton.disabled = false;

        submitButton.value =
            originalSubmitText;

    };


    /**
     * 正常送信完了。
     *
     * 成功後の再送信を防ぐため
     * ボタンは無効のままにする。
     */
    const finishSubmitting = () => {

        isSubmitting = true;


        if (!submitButton) {
            return;
        }


        submitButton.disabled = true;

        submitButton.value =
            "送信しました";

    };


    /* ==================================================
       Validation
    ================================================== */

    /**
     * 現在表示中のSTEPをチェックする。
     *
     * true
     * → 次へ進める / 送信できる
     *
     * false
     * → 現在STEPに留まる
     */
    const validateCurrentStep = () => {

        const step =
            steps[currentStep];


        removeErrors(step);


        /* ==================================================
           STEP 1
           ご相談内容
        ================================================== */

        if (currentStep === 0) {

            const group =
                step.querySelector(
                    ".js-consultation-group"
                );


            const checked =
                group?.querySelector(
                    'input[type="checkbox"]:checked'
                );


            if (!checked) {

                showError(
                    group,
                    "ご相談内容を1つ以上選択してください。"
                );


                return false;
            }

        }


        /* ==================================================
           STEP 2 / STEP 3 / STEP 4
           Radio Required
        ================================================== */

        const radioGroups =
            step.querySelectorAll(
                ".js-required-radio"
            );


        for (
            const group
            of radioGroups
        ) {

            const checked =
                group.querySelector(
                    'input[type="radio"]:checked'
                );


            if (!checked) {

                showError(
                    group,
                    "選択してください。"
                );


                return false;
            }

        }


        /* ==================================================
           STEP 4
           Select Required
        ================================================== */

        if (currentStep === 3) {

            const requiredSelects =
                step.querySelectorAll(
                    "select"
                );


            for (
                const select
                of requiredSelects
            ) {

                if (
                    !select.value ||
                    select.selectedIndex === 0
                ) {

                    const field =
                        select.closest(
                            ".contact-field"
                        );


                    showError(
                        field,
                        "選択してください。"
                    );


                    return false;
                }

            }

        }


        /* ==================================================
           STEP 5
           Contact Information
        ================================================== */

        if (currentStep === 4) {

            /* =========================
               Name
            ========================== */

            const name =
                step.querySelector(
                    'input[name="your-name"]'
                );


            if (
                !name ||
                !name.value.trim()
            ) {

                showError(
                    name?.closest(
                        ".contact-field"
                    ) ?? step,
                    "お名前を入力してください。"
                );


                return false;
            }


            /* =========================
               Email
            ========================== */

            const email =
                step.querySelector(
                    'input[name="your-email"]'
                );


            if (
                !email ||
                !email.value.trim()
            ) {

                showError(
                    email?.closest(
                        ".contact-field"
                    ) ?? step,
                    "メールアドレスを入力してください。"
                );


                return false;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                showError(
                    email.closest(
                        ".contact-field"
                    ),
                    "正しいメールアドレスを入力してください。"
                );


                return false;
            }


            /* =========================
               Contact Method
            ========================== */

            const contactMethod =
                step.querySelector(
                    'input[name="contact-method"]:checked'
                );


            if (!contactMethod) {

                showError(
                    step.querySelector(
                        ".js-contact-method"
                    ),
                    "希望する連絡方法を選択してください。"
                );


                return false;
            }


            /* =========================
               Telephone
            ========================== */

            const tel =
                step.querySelector(
                    'input[name="your-tel"]'
                );


            /*
             * 「電話」を希望した場合のみ
             * 電話番号必須。
             */
            if (
                contactMethod.value === "電話"
            ) {

                if (
                    !tel ||
                    !tel.value.trim()
                ) {

                    showError(
                        tel?.closest(
                            ".contact-field"
                        ) ?? step,
                        "電話連絡をご希望の場合は電話番号を入力してください。"
                    );


                    return false;
                }


                /*
                 * ハイフン・空白を除去してから判定。
                 */
                const telValue =
                    tel.value.replace(
                        /[-\s]/g,
                        ""
                    );


                const telPattern =
                    /^0\d{9,10}$/;


                if (
                    !telPattern.test(
                        telValue
                    )
                ) {

                    showError(
                        tel.closest(
                            ".contact-field"
                        ),
                        "正しい電話番号を入力してください。"
                    );


                    return false;
                }

            }


            /* =========================
               Privacy Consent
            ========================== */

            const privacy =
                step.querySelector(
                    'input[name="privacy-consent"]'
                );


            if (
                !privacy ||
                !privacy.checked
            ) {

                showError(
                    privacy?.closest(
                        ".contact-field"
                    ) ?? step,
                    "個人情報の取り扱いへの同意が必要です。"
                );


                return false;
            }

        }


        return true;

    };


    /* ==================================================
       Render Step
    ================================================== */

    /**
     * currentStepに合わせて
     * STEP1〜5の表示を切り替える。
     */
    const renderStep = () => {

        steps.forEach(
            (step, index) => {

                step.hidden =
                    index !== currentStep;

            }
        );


        /* Progress Text */

        if (progressStep) {

            progressStep.textContent =
                `STEP ${currentStep + 1} / ${steps.length}`;

        }


        if (progressName) {

            progressName.textContent =
                steps[currentStep]
                    .dataset
                    .stepName
                ?? "";

        }


        /* Progress Bar */

        if (progressBar) {

            const percentage =
                (
                    (currentStep + 1)
                    /
                    steps.length
                )
                * 100;


            progressBar.style.width =
                `${percentage}%`;

        }


        /* Progress Dots */

        progressDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "is-active",
                    index <= currentStep
                );

            }
        );

    };


    /* ==================================================
       Next
    ================================================== */

    nextButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        !validateCurrentStep()
                    ) {

                        scrollToError(
                            steps[currentStep]
                        );


                        return;
                    }


                    if (
                        currentStep
                        <
                        steps.length - 1
                    ) {

                        currentStep++;


                        renderStep();


                        formContainer
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });

                    }

                }
            );

        }
    );


    /* ==================================================
       Previous
    ================================================== */

    prevButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                     * 送信処理中は
                     * STEP移動させない。
                     */
                    if (isSubmitting) {
                        return;
                    }


                    if (
                        currentStep > 0
                    ) {

                        removeErrors(
                            steps[currentStep]
                        );


                        currentStep--;


                        renderStep();


                        formContainer
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });

                    }

                }
            );

        }
    );


    /* ==================================================
       Final Submit Validation
    ================================================== */

    /**
     * STEP5送信前の
     * クライアント側バリデーション。
     *
     * ここで二重送信防止も行う。
     */
    form.addEventListener(
        "submit",
        (event) => {

            /* =========================
               Double Submit Guard
            ========================== */

            /*
             * すでに送信中なら
             * 2回目以降のsubmitを停止する。
             */
            if (isSubmitting) {

                event.preventDefault();

                event.stopImmediatePropagation();

                return;
            }


            /* =========================
               Step Guard
            ========================== */

            /*
             * STEP5以外からの
             * submitは許可しない。
             */
            if (
                currentStep
                !==
                steps.length - 1
            ) {

                event.preventDefault();

                event.stopImmediatePropagation();

                return;
            }


            /* =========================
               Client Validation
            ========================== */

            if (
                !validateCurrentStep()
            ) {

                event.preventDefault();

                event.stopImmediatePropagation();


                scrollToError(
                    steps[currentStep]
                );


                return;
            }


            /*
             * JS側チェックをすべて通過。
             *
             * この時点でボタンを無効化し、
             * WordPress / CF7への送信を開始する。
             */
            startSubmitting();

        },
        true
    );


    /* ==================================================
       CF7 Events
    ================================================== */

    if (cf7Root) {

        /* ==============================================
           Server Validation Error
        ============================================== */

        cf7Root.addEventListener(
            "wpcf7invalid",
            () => {

                /*
                 * PHP / CF7側でエラーになったので、
                 * 再入力できるようボタンを戻す。
                 */
                resetSubmitting();


                const invalidField =
                    form.querySelector(
                        ".wpcf7-not-valid"
                    );


                if (!invalidField) {
                    return;
                }


                const invalidStep =
                    invalidField.closest(
                        ".js-form-step"
                    );


                if (!invalidStep) {
                    return;
                }


                const index =
                    steps.indexOf(
                        invalidStep
                    );


                if (index === -1) {
                    return;
                }


                currentStep =
                    index;


                renderStep();


                formContainer
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });

            }
        );


        /* ==============================================
           Spam
        ============================================== */

        cf7Root.addEventListener(
            "wpcf7spam",
            () => {

                /*
                 * Turnstile / CF7等により
                 * スパム判定された場合。
                 *
                 * 再操作できる状態へ戻す。
                 */
                resetSubmitting();

            }
        );


        /* ==============================================
           Mail Failed
        ============================================== */

        cf7Root.addEventListener(
            "wpcf7mailfailed",
            () => {

                /*
                 * メール送信に失敗した場合は
                 * 再送信できるように戻す。
                 */
                resetSubmitting();

            }
        );


        /* ==============================================
           Mail Sent
        ============================================== */

        cf7Root.addEventListener(
            "wpcf7mailsent",
            () => {

                /*
                 * 正常送信完了。
                 *
                 * 成功後の再クリックによる
                 * 二重送信を防ぐため、
                 * ボタンはdisabledのままにする。
                 */
                finishSubmitting();

            }
        );

    }


    /* ==================================================
       Initial Display
    ================================================== */

    renderStep();

});
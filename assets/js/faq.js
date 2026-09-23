/**
 * FAQ Accordion
 *
 * FAQの開閉状態を制御する。
 * aria-expandedとhidden属性も合わせて更新し、
 * キーボード操作にも対応する。
 */

document.addEventListener("DOMContentLoaded", () => {

    const questions = document.querySelectorAll(
        ".faq-item__question"
    );

    questions.forEach((question) => {

        question.addEventListener("click", () => {

            const answerId =
                question.getAttribute("aria-controls");

            const answer =
                document.getElementById(answerId);

            if (!answer) {
                return;
            }

            const isOpen =
                question.getAttribute("aria-expanded")
                === "true";


            /*
             * 他のFAQを閉じる。
             * 一度に1項目だけ開く仕様。
             */
            questions.forEach((otherQuestion) => {

                if (otherQuestion === question) {
                    return;
                }

                const otherAnswerId =
                    otherQuestion.getAttribute(
                        "aria-controls"
                    );

                const otherAnswer =
                    document.getElementById(
                        otherAnswerId
                    );

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (otherAnswer) {
                    otherAnswer.hidden = true;
                }

            });


            /*
             * 選択されたFAQを開閉する。
             */
            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            answer.hidden = isOpen;

        });

    });

});
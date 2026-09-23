<?php

/**
 * BEATLAB Drum School Theme Functions
 *
 * テーマで使用するCSS / JavaScriptの読み込み、
 * テーマ初期設定、
 * 各機能ファイルの読み込みを管理する。
 */


/* ==================================================
   Feature Files
================================================== */

/**
 * Contact Form 7
 * カスタムバリデーションを読み込む。
 */
require_once get_template_directory()
    . '/inc/cf7-validation.php';


/* ==================================================
   Assets
================================================== */

/**
 * テーマで使用するCSS / JavaScriptを読み込む。
 */
function drum_school_lp_enqueue_assets() {

    $theme_uri =
        get_template_directory_uri();


    /* =========================
       CSS
    ========================== */

    $styles = array(
        'base',
        'layout',
        'components',
        'header',
        'hero',
        'trial-bar',
        'features',
        'flow',
        'pricing',
        'instructor',
        'voice',
        'faq',
        'final-cta',
        'contact',
        'footer',
    );


    foreach ($styles as $style) {

        wp_enqueue_style(
            'drum-school-' . $style,
            $theme_uri
                . '/assets/css/'
                . $style
                . '.css',
            array(),
            '1.0.0'
        );

    }


    /* =========================
       Thanks Page CSS
    ========================== */

    /**
     * サンクスページ専用CSS。
     *
     * /thanks/ の場合のみ読み込む。
     */
    if (is_page('thanks')) {

        wp_enqueue_style(
            'drum-school-thanks',
            $theme_uri
                . '/assets/css/thanks.css',
            array(),
            '1.0.0'
        );

    }


    /* =========================
       JavaScript
    ========================== */

    /**
     * LP共通処理。
     */
    wp_enqueue_script(
        'drum-school-lp',
        $theme_uri
            . '/assets/js/lp.js',
        array(),
        '1.0.0',
        true
    );


    /**
     * FAQ開閉処理。
     */
    wp_enqueue_script(
        'drum-school-faq',
        $theme_uri
            . '/assets/js/faq.js',
        array(),
        '1.0.0',
        true
    );


    /**
     * Contact Form 7
     * 5STEPフォーム制御。
     */
    wp_enqueue_script(
        'drum-school-multi-step-form',
        $theme_uri
            . '/assets/js/multi-step-form.js',
        array(),
        '1.0.0',
        true
    );


    /**
     * JavaScriptへWordPress側のURLを渡す。
     *
     * JSにローカルURLや本番URLを
     * 直接書かないための設定。
     */
    wp_localize_script(
        'drum-school-multi-step-form',
        'drumSchoolFormConfig',
        array(
            'thanksUrl' =>
                home_url('/thanks/'),
        )
    );

}

add_action(
    'wp_enqueue_scripts',
    'drum_school_lp_enqueue_assets'
);


/* ==================================================
   Theme Setup
================================================== */

/**
 * WordPressテーマ初期設定。
 */
function drum_school_lp_setup() {

    /**
     * ページタイトルを
     * WordPress側で管理する。
     */
    add_theme_support(
        'title-tag'
    );

}

add_action(
    'after_setup_theme',
    'drum_school_lp_setup'
);
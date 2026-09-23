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
 *
 * JavaScript側だけではなく、
 * PHP / CF7側でも入力値を検証する。
 */
require_once get_template_directory()
    . '/inc/cf7-validation.php';


/* ==================================================
   Assets
================================================== */

/**
 * LPで使用するCSS / JavaScriptを読み込む。
 *
 * CSSは責務ごとに分割し、
 * WordPress標準のenqueue機能で読み込む。
 */
function drum_school_lp_enqueue_assets() {

    $theme_uri = get_template_directory_uri();


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
     *
     * - 次へ
     * - 戻る
     * - 入力値保持
     * - STEP表示切り替え
     * - クライアント側バリデーション
     */
    wp_enqueue_script(
        'drum-school-multi-step-form',
        $theme_uri
            . '/assets/js/multi-step-form.js',
        array(),
        '1.0.0',
        true
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
     * <title>をWordPress側で管理する。
     */
    add_theme_support(
        'title-tag'
    );

}

add_action(
    'after_setup_theme',
    'drum_school_lp_setup'
);
<?php

/**
 * LP専用のCSS / JavaScriptを読み込む。
 *
 * wp_enqueue_scripts に登録することで、
 * header.php / footer.php にscriptタグやlinkタグを直接書かず、
 * WordPress標準の方法で管理する。
 */

function drum_school_lp_enqueue_assets() {

    // LP全体のスタイル
    wp_enqueue_style(
        'drum-school-lp-style',
        get_template_directory_uri() . '/assets/css/lp.css',
        array(),
        '1.0.0'
    );

    // LP全体のJavaScript
    // 最後の true により </body> 直前で読み込まれる
    wp_enqueue_script(
        'drum-school-lp-script',
        get_template_directory_uri() . '/assets/js/lp.js',
        array(),
        '1.0.0',
        true
    );
}

add_action('wp_enqueue_scripts', 'drum_school_lp_enqueue_assets');

/**
 * WordPressテーマの初期設定。
 */

function drum_school_lp_setup() {
    
    // <title>タグをWordPress側で自動管理する
    add_theme_support('title-tag');
}

add_action('after_setup_theme', 'drum_school_lp_setup');
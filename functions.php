<?php

/**
 * LPで使用するCSS / JavaScriptを読み込む。
 *
 * CSSは責務ごとに分割し、
 * WordPress標準のenqueue機能で読み込む。
 */
function drum_school_lp_enqueue_assets() {

    $theme_uri = get_template_directory_uri();

    $styles = array(
        'base',
        'layout',
        'components',
        'header',
        'hero',
        'trial-bar',
        'features',
    );

    foreach ($styles as $style) {

        wp_enqueue_style(
            'drum-school-' . $style,
            $theme_uri . '/assets/css/' . $style . '.css',
            array(),
            '1.0.0'
        );
    }

    wp_enqueue_script(
        'drum-school-lp',
        $theme_uri . '/assets/js/lp.js',
        array(),
        '1.0.0',
        true
    );
}

add_action(
    'wp_enqueue_scripts',
    'drum_school_lp_enqueue_assets'
);


/**
 * WordPressテーマ初期設定。
 */
function drum_school_lp_setup() {

    // ページタイトルをWordPress側で管理する。
    add_theme_support('title-tag');
}

add_action(
    'after_setup_theme',
    'drum_school_lp_setup'
);
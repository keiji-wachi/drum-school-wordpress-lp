<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

     /**
     * WordPress本体・テーマ・プラグインが
     * 必要なCSSやmeta情報などを出力するために必要。
     *
     * 削除しないこと。
     */

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

/**
 * body開始直後にWordPressやプラグインが
 * HTMLを挿入できるようにするフック。
 */

<?php wp_body_open(); ?>
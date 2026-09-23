<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

<header class="site-header">

    <div class="site-header__inner">

        <a
            href="<?php echo esc_url(home_url('/')); ?>"
            class="site-logo"
            aria-label="BEATLAB Drum School トップへ"
        >
            <span class="site-logo__beat">BEAT</span>
            <span class="site-logo__lab">LAB</span>
            <span class="site-logo__sub">Drum School</span>
        </a>

        <nav
            class="site-nav"
            aria-label="メインナビゲーション"
        >
            <a href="#features">スクールの特徴</a>
            <a href="#lessons">レッスン内容</a>
            <a href="#voice">受講生の声</a>
            <a href="#faq">よくある質問</a>
        </nav>

        <a
            href="#contact"
            class="site-header__cta"
        >
            無料体験を申し込む
        </a>

    </div>

</header>
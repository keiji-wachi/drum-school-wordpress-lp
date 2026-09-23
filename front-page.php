<?php

/**
 * Drum School LP
 *
 * ドラムスクールの集客・無料体験レッスン申込用LP。
 */

get_header();

?>

<main class="lp-main">

    <?php get_template_part('template-parts/sections/hero'); ?>

    <?php get_template_part('template-parts/sections/trial-bar'); ?>

    <?php get_template_part('template-parts/sections/features'); ?>

</main>

<?php get_footer(); ?>
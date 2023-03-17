<?php

namespace App\Consts;

class RichMenuTemplateSecondConsts
{
    const WIDTH = 1200;
    const HEIGHT = 405;

    public const TYPE_H = [
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT,
            'x' => self::WIDTH / 3,
            'y' => 0,
            'label' => 'b',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT,
            'x' => self::WIDTH / 1.5,
            'y' => 0,
            'label' => 'c',
        ],
    ];

    public const TYPE_I = [
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 1.5,
            'height' => self::HEIGHT,
            'x' => self::WIDTH / 3,
            'y' => 0,
            'label' => 'b',
        ],
    ];

    public const TYPE_J = [
        [
            'width' => self::WIDTH / 1.5,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'b',
        ],
    ];

    public const TYPE_K = [
        [
            'width' => self::WIDTH / 2,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 2,
            'height' => self::HEIGHT,
            'x' => self::WIDTH / 2,
            'y' => 0,
            'label' => 'b',
        ],
    ];

    public const TYPE_L = [
        [
            'width' => self::WIDTH,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
    ];
}
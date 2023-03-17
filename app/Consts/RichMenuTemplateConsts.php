<?php

namespace App\Consts;

class RichMenuTemplateConsts
{
    public const WIDTH = 1200;
    public const HEIGHT = 810;

    public const TYPE_A = [
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 400,
            'y' => 0,
            'label' => 'b',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 800,
            'y' => 0,
            'label' => 'c',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => 405,
            'label' => 'd',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 400,
            'y' => 405,
            'label' => 'e',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 800,
            'y' => 405,
            'label' => 'f',
        ],
    ];

    public const TYPE_B = [
        [
            'width' => self::WIDTH / 2,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 2,
            'height' => self::HEIGHT / 2,
            'x' => self::WIDTH / 2,
            'y' => 0,
            'label' => 'b',
        ],
        [
            'width' => self::WIDTH / 2,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => self::HEIGHT / 2,
            'label' => 'c',
        ],
        [
            'width' => self::WIDTH / 2,
            'height' => self::HEIGHT / 2,
            'x' => self::WIDTH / 2,
            'y' => self::HEIGHT / 2,
            'label' => 'd',
        ],
    ];

    public const TYPE_C = [
        [
            'width' => self::WIDTH,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => self::HEIGHT / 2,
            'label' => 'b',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => self::WIDTH / 3,
            'y' => self::HEIGHT / 2,
            'label' => 'c',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => self::WIDTH / 1.5,
            'y' => self::HEIGHT / 2,
            'label' => 'd',
        ],
    ];

    public const TYPE_D = [
        [
            'width' => self::WIDTH / 1.5,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => self::WIDTH / 1.5,
            'y' => 0,
            'label' => 'b',
        ],
        [
            'width' => self::WIDTH / 3,
            'height' => self::HEIGHT / 2,
            'x' => self::WIDTH / 1.5,
            'y' => self::HEIGHT / 2,
            'label' => 'c',
        ],
    ];

    public const TYPE_E = [
        [
            'width' => self::WIDTH,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
        [
            'width' => self::WIDTH,
            'height' => self::HEIGHT / 2,
            'x' => 0,
            'y' => self::HEIGHT / 2,
            'label' => 'b',
        ],
    ];

    public const TYPE_F = [
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

    public const TYPE_G = [
        [
            'width' => self::WIDTH,
            'height' => self::HEIGHT,
            'x' => 0,
            'y' => 0,
            'label' => 'a',
        ],
    ];
}
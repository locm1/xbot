<?php
namespace App\Services\api\line\greeting;

use LINE\LINEBot;
use LINE\LINEBot\MessageBuilder\Flex\ContainerBuilder\BubbleContainerBuilder;
use LINE\LINEBot\MessageBuilder\Flex\ComponentBuilder\BoxComponentBuilder;
use LINE\LINEBot\MessageBuilder\Flex\ComponentBuilder\ButtonComponentBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;
use LINE\LINEBot\Constant\Flex\ComponentLayout;
use LINE\LINEBot\MessageBuilder\FlexMessageBuilder;

class FlexMessageBuilderAction 
{
    private $user_id;
    private $bot;
    private $url;

    public function __construct(LINEBot $bot, string $user_id, string $url) {
        $this->user_id = $user_id;
        $this->bot = $bot;
        $this->url = $url;
    }

    public function createFlexMessage()
    {
        $alt_text = 'アンケート回答ボタンのFlexメッセージ';
        $bubble_container_builder = $this->createContents();
        $flex_message_builder = new FlexMessageBuilder($alt_text, $bubble_container_builder);
        return $flex_message_builder;
    }

    private function createContents()
    {
        $box_conponent_builder = $this->createBox();
        $bubble_container_builder = new BubbleContainerBuilder();
        $bubble_container_builder->setBody($box_conponent_builder);
        return $bubble_container_builder;
    }

    private function createBox()
    {
        $component_builders = array();
        $layout = ComponentLayout::VERTICAL;
        $component_builders[] = $this->createButton();
        $box_conponent_builder = new BoxComponentBuilder($layout, $component_builders);
        $box_conponent_builder->setBackgroundColor('#d5908c');
        $box_conponent_builder->setPaddingAll('0px');
        return $box_conponent_builder;
    }

    private function createButton()
    {
        $action_builder = $this->createAction();
        $button_component_builder = new ButtonComponentBuilder($action_builder);
        $button_component_builder->setColor('#ffffff');
        return $button_component_builder;
    }

    private function createAction()
    {
        $label = 'アンケートに回答';
        $url = $this->url .'/questionnaire';
        $uri_template_action_builder = new UriTemplateActionBuilder($label, $url);
        return $uri_template_action_builder;
    }
}
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
    public function createFlexMessage()
    {
        $action_builder = $this->createAction();
        $button_component_builder = $this->createButton($action_builder);
        $box_component_builder = $this->createBox($button_component_builder);
        $bubble_container_builder = $this->createContents($box_component_builder);
        $flex_message_builder = new FlexMessageBuilder('アンケート', $bubble_container_builder);
        return $flex_message_builder;
    }

    private function createAction()
    {
        $label = 'アンケートに回答';
        $url = 'https://liff.line.me/' . config('api_key.MIX_LIFF_ID') . '/liff?path=questionnaire';
        $uri_template_action_builder = new UriTemplateActionBuilder($label, $url);
        return $uri_template_action_builder;
    }

    private function createButton($action_builder)
    {
        $button_component_builder = new ButtonComponentBuilder($action_builder);
        $button_component_builder->setColor('#ffffff');
        return $button_component_builder;
    }

    private function createBox($component_builder)
    {
        $component_builders = array();
        $layout = ComponentLayout::VERTICAL;
        $component_builders[] = $component_builder;
        $box_component_builder = new BoxComponentBuilder($layout, $component_builders);
        $box_component_builder->setBackgroundColor('#d5908c');
        $box_component_builder->setPaddingAll('0px');
        return $box_component_builder;
    }

    private function createContents($box_component_builder)
    {
        $bubble_container_builder = new BubbleContainerBuilder();
        $bubble_container_builder->setBody($box_component_builder);
        return $bubble_container_builder;
    }
}
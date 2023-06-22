<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $email;
    public $email_sender_name;
    public $order;
    public $order_products;
    public $url;

    public function __construct($email, $email_sender_name, $order, $order_products, $url)
    {
        $this->email = $email;
        $this->email_sender_name = $email_sender_name;
        $this->order = $order;
        $this->order_products = $order_products;
        $this->url = $url;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        $from_address = config('mail.from')['address'];
        return new Envelope(
            from: new Address($from_address, $this->email_sender_name),
            subject: '新しい注文がありました',
            to: $this->email,
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            text: 'email.order_mail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}

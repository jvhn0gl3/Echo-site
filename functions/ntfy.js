export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    
    // Use NTFY_TOPIC from environment variables or fallback to a default
    const topic = env.NTFY_TOPIC || "echo_os_notifications";
    const ntfyUrl = `https://ntfy.sh/${topic}`;

    // Construct the message from the incoming data
    // Supports 'message', 'title', 'tags', 'priority', etc.
    const ntfyPayload = {
      topic: topic,
      message: data.message || "System Alert: No message content provided.",
      title: data.title || "Echo OS // Notification",
      tags: data.tags || ["incoming_envelope", "zap"],
      priority: data.priority || 3,
      click: data.link || "https://john-ogletree.me"
    };

    const response = await fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add authorization if the user has a private ntfy server/topic
        ...(env.NTFY_AUTH ? { 'Authorization': `Bearer ${env.NTFY_AUTH}` } : {})
      },
      body: JSON.stringify(ntfyPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ntfy error: ${response.status} - ${errorText}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      timestamp: new Date().toISOString() 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: err.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Optional: GET request for health check
export async function onRequestGet() {
  return new Response(JSON.stringify({ 
    status: "online", 
    service: "Echo OS ntfy Forwarder" 
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

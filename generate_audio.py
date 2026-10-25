import asyncio
import os
import edge_tts

# Data teks yang akan diubah menjadi audio
AUDIO_ITEMS = [
    {"id": 1, "text": "Apple"},
    {"id": 2, "text": "Thank you very much"},
    {"id": 3, "text": "He is a doctor"},
    {"id": 4, "text": "I want to drink water"},
    {"id": 5, "text": "How much is this?"}
]

# Suara Microsoft Natural (en-US-JennyNeural atau en-US-GuyNeural)
VOICE = "en-US-JennyNeural"
OUTPUT_DIR = "audio"

async def generate_audio_files():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"Folder '{OUTPUT_DIR}' berhasil dibuat.")

    for item in AUDIO_ITEMS:
        filename = f"audio_{item['id']}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        print(f"Generating ({item['id']}/{len(AUDIO_ITEMS)}): {filename} -> '{item['text']}'")
        
        communicate = edge_tts.Communicate(item["text"], VOICE)
        await communicate.save(filepath)

    print("\n[SELESAI] Semua file audio berhasil dibuat di dalam folder 'audio/'!")

if __name__ == "__main__":
    asyncio.run(generate_audio_files())
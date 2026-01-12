"use client";

export default function ChatPage() {
    return (
        <div className="h-full w-full min-h-[150vh]">
            <iframe
                width="100%"
                height="100%"
                allow="clipboard-read https://us-west-2.quicksight.aws.amazon.com; clipboard-write https://us-west-2.quicksight.aws.amazon.com"
                src="https://us-west-2.quicksight.aws.amazon.com/sn/embed/share/accounts/577638367293/chatagents/e9e7d47e-6243-4807-8a62-844410139e45?directory_alias=SouthlandInd-SmartAsset"
                style={{ border: 'none', width: '100%', height: '100%' }}>
            </iframe>
        </div>
    );
}

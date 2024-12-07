import React, { useRef, useState, useEffect } from "react";
import backgroundImage from "../assets/BG.png";  // นำเข้าภาพจากโฟลเดอร์ src/assets

interface CanvasComponentProps {
    width?: number;
    height?: number;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
    width = 1440,
    height = 1080,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDrawing, setIsDrawing] = useState(false); // ใช้เพื่อควบคุมสถานะการวาด
    const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null); // เก็บตำแหน่งของกรอบสี่เหลี่ยมที่วาด
    const [drawnRects, setDrawnRects] = useState<Array<{ x: number; y: number; width: number; height: number }>>([]); // เก็บกรอบที่วาดแล้ว

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // ตั้งค่าขนาดของ canvas
        canvas.width = width;
        canvas.height = height;

        // ฟังก์ชันสำหรับการเปลี่ยนพื้นหลัง
        const updateBackground = () => {
            if (backgroundImage) {
                const img = new Image();
                img.src = backgroundImage;

                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // ล้างพื้นที่เก่า
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // วาดรูป
                };
            }
        };

        updateBackground();

        // ฟังก์ชันจัดการการเคลื่อนที่ของเมาส์
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setMousePosition({ x, y });

            if (isDrawing && rect) {
                // ถ้าเรากำลังวาดอยู่ ให้อัปเดตขนาดของกรอบที่กำลังวาด
                setRect((prevRect) => {
                    return {
                        ...prevRect!,
                        width: x - prevRect!.x,
                        height: y - prevRect!.y,
                    };
                });
            }
        };

        // ฟังก์ชันจัดการการคลิกเพื่อเริ่มการวาด
        const handleMouseDown = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setIsDrawing(true);
            setRect({ x, y, width: 0, height: 0 }); // เริ่มการวาดกรอบใหม่จากจุดนี้
        };

        // ฟังก์ชันจัดการการปล่อยเมาส์เพื่อสิ้นสุดการวาด
        const handleMouseUp = () => {
            if (rect) {
                setDrawnRects((prevRects) => [...prevRects, rect]); // เก็บกรอบที่วาดเสร็จแล้ว
                setIsDrawing(false); // หยุดการวาด
                setRect(null); // เคลียร์กรอบที่กำลังวาด
            }
        };

        // เพิ่ม event listener ให้ canvas
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
            // ลบ event listener เมื่อคอมโพเนนต์ถูกทำลาย
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
        };
    }, [width, height, isDrawing, rect]);

    // ฟังก์ชันวาดกรอบที่เก็บไว้ใน drawnRects
    const drawRects = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // วาดกรอบที่ถูกเก็บไว้ใน drawnRects
        drawnRects.forEach((r) => {
            ctx.beginPath();
            ctx.rect(r.x, r.y, r.width, r.height); // วาดกรอบสี่เหลี่ยม
            ctx.strokeStyle = "blue"; // สีกรอบ
            ctx.lineWidth = 2; // ความหนาของกรอบ
            ctx.stroke();
        });

        // วาดกรอบที่กำลังวาด (ถ้ามี)
        if (rect) {
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.width, rect.height); // วาดกรอบสี่เหลี่ยมที่กำลังวาด
            ctx.strokeStyle = "red"; // สีกรอบที่กำลังวาด
            ctx.lineWidth = 2; // ความหนาของกรอบ
            ctx.stroke();
        }
    };

    // วาดกรอบทุกครั้งที่รีเรนเดอร์
    useEffect(() => {
        drawRects();
    }, [drawnRects, rect]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* Canvas */}
            <canvas ref={canvasRef} style={{ border: "1px solid black" }} />

            {/* Custom Cursor */}
            <div
                style={{
                    position: "absolute",
                    top: `${mousePosition.y - 75}px`, // ตั้งให้ cursor อยู่กลางจากความสูง 150px
                    left: `${mousePosition.x - 50}px`, // ตั้งให้ cursor อยู่กลางจากความกว้าง 100px
                    width: "400px",  // ความกว้างของ cursor
                    height: "120px", // ความสูงของ cursor
                    backgroundColor: "white", // สีพื้นหลัง
                    borderRadius: "5px", // ขอบมน
                    pointerEvents: "none", // ไม่ให้กระทบกับ event อื่นๆ
                }}
            />

            {/* แสดงตำแหน่งของเมาส์ที่มุมซ้ายบน */}
            <div
                style={{
                    position: "absolute",
                    top: "10px",  // ตั้งให้แสดงตำแหน่งที่มุมซ้ายบน
                    left: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "18px",
                }}
            >
                x: {mousePosition.x.toFixed(0)}, y: {mousePosition.y.toFixed(0)}
            </div>

            {/* แสดงตำแหน่งกรอบที่วาด */}
            {rect && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",  // แสดงตำแหน่งกรอบที่วาดที่มุมล่างซ้าย
                        left: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontSize: "18px",
                    }}
                >
                    Rect - x: {rect.x.toFixed(0)}, y: {rect.y.toFixed(0)}, width: {rect.width.toFixed(0)}, height: {rect.height.toFixed(0)}
                </div>
            )}
        </div>
    );
};

export default CanvasComponent;

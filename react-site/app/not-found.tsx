import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="basic-page">
      <Container>
        <h1>Page not found</h1>
        <p>The page you are looking for may have moved during the rebuild.</p>
        <Link className="btn btn-primary" href="/">Return home</Link>
      </Container>
    </div>
  );
}
